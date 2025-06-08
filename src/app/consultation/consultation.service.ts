import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './model/consultation.entity';
import { In, Repository } from 'typeorm';
import { ConsultationDetail } from '../consultation-detail/model/consultation-detail.entity';
import { DiagnosisResult } from '../diagnosis-result/model/diagnosis-result.entity';
import { MessageService } from '../message/message.service';
import { User } from '../user/model/user.entity';
import { KnowledgeBase } from '../knowledge-base/model/knowledge-base.entity';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { Transactional } from 'typeorm-transactional';
import { generateID } from '../../utils/generateID';
import { Symptom } from '../symptom/model/symptom.entity';
import {
  IResAllConsultation,
  IResDetailConsultation,
} from './dto/response.dto';
import { DiagnosisResultDisorder } from '../diagnosis-result-disorder/model/diagnosis-result-disorder';
import { Disorder } from '../disorder/model/disorder.entity';
import {
  IMassFunction,
  IResNewConsultation,
} from './interface/respomse.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,

    @InjectRepository(ConsultationDetail)
    private readonly consultationDetailRepository: Repository<ConsultationDetail>,

    @InjectRepository(DiagnosisResult)
    private readonly diagnosisResultRepository: Repository<DiagnosisResult>,

    @InjectRepository(DiagnosisResultDisorder)
    private readonly diagnosisResultDisorderRepository: Repository<DiagnosisResultDisorder>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(KnowledgeBase)
    private readonly knowledgeBaseRepository: Repository<KnowledgeBase>,

    @InjectRepository(Symptom)
    private readonly symtompRepository: Repository<Symptom>,

    private readonly messageService: MessageService,
  ) {}

  @Transactional()
  public async createConsultation(
    userId: string,
    { symptomIds }: CreateConsultationDto,
  ): Promise<IResNewConsultation> {
    const user: User | null = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) throw new NotFoundException('User not found');

    const newConsultation: Consultation =
      await this.consultationRepository.save({
        id: `C-${uuidv4()}`,
        user,
      });

    for (const symptomId of symptomIds) {
      const symptom: Symptom | null = await this.symtompRepository.findOneBy({
        id: symptomId,
      });

      if (!symptom) throw new NotFoundException('Symptom not found');

      const lastDetail: ConsultationDetail[] =
        await this.consultationDetailRepository.find({
          order: { id: 'DESC' },
          take: 1,
        });

      const newDetailId: string = generateID('CD', lastDetail[0]?.id ?? null);

      await this.consultationDetailRepository.save({
        id: newDetailId,
        consultation: newConsultation,
        symptom,
      });
    }

    const knowledgeBases: KnowledgeBase[] =
      await this.knowledgeBaseRepository.find({
        where: { symptom: { id: In(symptomIds) } },
        relations: ['disorder', 'symptom'],
      });

    const massFunction: IMassFunction[] = [];

    for (const symptomId of symptomIds) {
      const symptomKnowledgeBases: KnowledgeBase[] = knowledgeBases.filter(
        (kb) => kb.symptom.id === symptomId,
      );

      const rawBelief: number = symptomKnowledgeBases.reduce(
        (sum, kb) => sum + kb.weight,
        0,
      );

      const belief: number =
        symptomKnowledgeBases.length === 0
          ? 0
          : parseFloat((rawBelief / symptomKnowledgeBases.length).toFixed(2));

      const uniqueDisorders: string[] = [
        ...new Set(symptomKnowledgeBases.map((kb) => kb.disorder.id)),
      ];

      if (belief > 0 && uniqueDisorders.length > 0) {
        massFunction.push({
          disorders: uniqueDisorders,
          belief,
        });
      }
    }

    const extendedMassFunction: IMassFunction[][] = massFunction.map((m) => [
      m,
      {
        disorders: ['θ'],
        belief: parseFloat((1 - m.belief).toFixed(2)),
      },
    ]);

    let combined: IMassFunction[] = extendedMassFunction[0];

    for (let i: number = 1; i < extendedMassFunction.length; i++) {
      combined = this.dempsterShafer(combined, extendedMassFunction[i]);
    }

    combined.sort((a, b) => b.belief - a.belief);
    const mostProbableDisorders: IMassFunction = combined[0];

    for (const combineDisorder of combined) {
      if (combineDisorder.disorders.includes('θ')) continue;

      const lastDiagnosisResult: DiagnosisResult[] =
        await this.diagnosisResultRepository.find({
          order: { id: 'DESC' },
          take: 1,
        });

      const newDiagnosisId: string = generateID(
        'DR',
        lastDiagnosisResult[0]?.id ?? null,
      );

      const diagnosisResult: DiagnosisResult =
        await this.diagnosisResultRepository.save({
          id: newDiagnosisId,
          consultation: newConsultation,
          belief_value: combineDisorder.belief,
        });

      if (!diagnosisResult)
        throw new BadRequestException('Diagnosis not found');

      for (const disorderId of combineDisorder.disorders) {
        const lastDiagnosisResultDisorder: DiagnosisResultDisorder[] =
          await this.diagnosisResultDisorderRepository.find({
            order: { id: 'DESC' },
            take: 1,
          });

        const newDiagnosisDisorderId: string = generateID(
          'DRD',
          lastDiagnosisResultDisorder[0]?.id ?? null,
        );

        await this.diagnosisResultDisorderRepository.save({
          id: newDiagnosisDisorderId,
          diagnosisResult: {
            id: newDiagnosisId,
          } as DiagnosisResult,
          disorder: {
            id: disorderId,
          } as Disorder,
        });
      }
    }

    this.messageService.setMessage('New consultation created successfully');

    return {
      consultationId: newConsultation.id,
      result: {
        disorders: mostProbableDisorders?.disorders ?? [],
        belief: mostProbableDisorders?.belief ?? 0,
      },
    };
  }

  private dempsterShafer(
    m1: IMassFunction[],
    m2: IMassFunction[],
  ): IMassFunction[] {
    const result: Record<string, number> = {};
    let conflict = 0;

    for (const mf1 of m1) {
      for (const mf2 of m2) {
        const intersection: string[] = mf1.disorders.includes('θ')
          ? mf2.disorders
          : mf2.disorders.includes('θ')
            ? mf1.disorders
            : mf1.disorders.filter((d) => mf2.disorders.includes(d));

        if (intersection.length === 0) {
          conflict += mf1.belief * mf2.belief;
          continue;
        }

        const key: string = [...new Set(intersection)].sort().join(',');
        result[key] = (result[key] || 0) + mf1.belief * mf2.belief;
      }
    }

    if (conflict === 1) {
      return [
        {
          disorders: ['θ'],
          belief: 1,
        },
      ];
    }

    const normalizedResult: IMassFunction[] = [];

    for (const key in result) {
      const belief: number = result[key] / (1 - conflict);
      const disorders: string[] = key.split(',');

      normalizedResult.push({
        disorders,
        belief: parseFloat(belief.toFixed(3)),
      });
    }

    return normalizedResult;
  }

  public async findAllConsultation(
    userId?: string,
  ): Promise<IResAllConsultation[]> {
    const consultation: Consultation[] = await this.consultationRepository.find(
      {
        where: {
          user: {
            id: userId,
          },
        },
        relations: [
          'user',
          'diagnosisResult',
          'diagnosisResult.diagnosisResultDisorder',
          'diagnosisResult.diagnosisResultDisorder.disorder',
        ],
        order: {
          createdAt: 'DESC',
        },
      },
    );

    this.messageService.setMessage('Get all consultation successfully');

    const response: IResAllConsultation[] = consultation.map(
      (c: Consultation) => {
        const highestBeliefResult: DiagnosisResult = c.diagnosisResult.reduce(
          (prev: DiagnosisResult, current: DiagnosisResult) =>
            prev.belief_value > current.belief_value ? prev : current,
        );

        const percenTage: string = (
          highestBeliefResult.belief_value * 100
        ).toFixed(0);

        return {
          id: c.id,
          user: c.user.name,
          result: `${percenTage}% ${highestBeliefResult.diagnosisResultDisorder[0].disorder.name}`,
          createdAt: c.createdAt,
        };
      },
    );

    return response;
  }

  public async findDetailConsultation(
    id: string,
  ): Promise<IResDetailConsultation> {
    const consultation: Consultation | null =
      await this.consultationRepository.findOne({
        where: {
          id,
        },
        relations: [
          'user',
          'consultationDetail',
          'consultationDetail.symptom',
          'diagnosisResult',
          'diagnosisResult.diagnosisResultDisorder',
          'diagnosisResult.diagnosisResultDisorder.disorder',
          'diagnosisResult.diagnosisResultDisorder.disorder.solution',
        ],
      });

    if (!consultation) throw new NotFoundException('Consultation not found');

    this.messageService.setMessage('Get detail consultation successfully');

    const sortedDiagnosis: DiagnosisResult[] = [
      ...consultation.diagnosisResult,
    ].sort((a, b) => b.belief_value - a.belief_value);

    return {
      id: consultation.id,
      userId: consultation.user.id,
      user: consultation.user.name,
      userAddress: consultation.user.address,
      userEmail: consultation.user.email,
      userPhoneNumber: consultation.user.phoneNumber,
      symptoms: consultation.consultationDetail.map(
        (cd: ConsultationDetail) => ({
          symptomId: cd.symptom.id,
          symptom: cd.symptom.symptom,
        }),
      ),
      diagnosisResult: sortedDiagnosis.map(
        (diagnosisResult: DiagnosisResult) => ({
          id: diagnosisResult.id,
          belief_value: parseFloat(diagnosisResult.belief_value.toFixed(2)),
          plausability_value: 1 - diagnosisResult.belief_value,
          disorder: diagnosisResult.diagnosisResultDisorder.map(
            (diagnosisResultDisorder: DiagnosisResultDisorder) => ({
              id: diagnosisResultDisorder.disorder.id,
              name: diagnosisResultDisorder.disorder.name,
            }),
          ),
        }),
      ),
      solution:
        sortedDiagnosis[0]?.diagnosisResultDisorder[0]?.disorder.solution.map(
          (s) => s.solution,
        ),
      createdAt: consultation.createdAt,
    };
  }
}
