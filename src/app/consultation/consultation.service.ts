import { Injectable, NotFoundException } from '@nestjs/common';
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
import { generateID } from 'src/utils/generateID';
import { Symptom } from '../symptom/model/symptom.entity';
import {
  IResAllConsultation,
  IResDetailConsultation,
} from './dto/response.dto';
import { Solution } from '../solution/model/solution.entity';

interface IMassFunction {
  disorders: string[];
  belief: number;
}

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,

    @InjectRepository(ConsultationDetail)
    private readonly consultationDetailRepository: Repository<ConsultationDetail>,

    @InjectRepository(DiagnosisResult)
    private readonly diagnosisResultRepository: Repository<DiagnosisResult>,

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
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const lastConsultation = await this.consultationRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    const newConsultationId = generateID('C', lastConsultation[0]?.id ?? null);
    const newConsultation = await this.consultationRepository.save({
      id: newConsultationId,
      user,
    });

    for (const symptomId of symptomIds) {
      const symptom = await this.symtompRepository.findOneBy({ id: symptomId });
      if (!symptom) throw new NotFoundException('Symptom not found');

      const lastDetail = await this.consultationDetailRepository.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const newDetailId = generateID('CD', lastDetail[0]?.id ?? null);
      await this.consultationDetailRepository.save({
        id: newDetailId,
        consultation: newConsultation,
        symptom,
      });
    }

    const knowledgeBases = await this.knowledgeBaseRepository.find({
      where: { symptom: { id: In(symptomIds) } },
      relations: ['disorder', 'symptom'],
    });

    const massFunction: IMassFunction[] = [];

    for (const symptom of symptomIds) {
      const massFunc: IMassFunction = {
        disorders: [],
        belief: 0,
      };

      let rawBelief = 0;

      const sykb = knowledgeBases.filter((kb) => kb.symptom.id === symptom);

      for (const kb of sykb) {
        massFunc.disorders.push(kb.disorder.id);
        rawBelief += kb.weight;
      }

      const belief = parseFloat((rawBelief / sykb.length).toFixed(2));

      massFunc.belief = belief;
      massFunction.push(massFunc);
    }

    console.log(massFunction);

    const extendedMassFunction = massFunction.map((m) => [
      m,
      { disorders: ['θ'], belief: parseFloat((1 - m.belief).toFixed(2)) },
    ]);

    // STEP: Fungsi combine menggunakan aturan Dempster-Shafer
    function combine(
      m1: IMassFunction[],
      m2: IMassFunction[],
    ): IMassFunction[] {
      const result: Record<string, number> = {};
      let conflict = 0;

      for (const mf1 of m1) {
        for (const mf2 of m2) {
          const intersection = mf1.disorders.includes('θ')
            ? mf2.disorders
            : mf2.disorders.includes('θ')
              ? mf1.disorders
              : mf1.disorders.filter((d) => mf2.disorders.includes(d));

          if (intersection.length === 0) {
            conflict += mf1.belief * mf2.belief;
            continue;
          }

          const key = [...new Set(intersection)].sort().join(',');
          result[key] = (result[key] || 0) + mf1.belief * mf2.belief;
        }
      }

      const normalizedResult: IMassFunction[] = [];

      for (const key in result) {
        const belief = result[key] / (1 - conflict);
        const disorders = key.split(',');
        normalizedResult.push({
          disorders,
          belief: parseFloat(belief.toFixed(3)),
        });
      }

      return normalizedResult;
    }

    let combined = extendedMassFunction[0];

    for (let i = 1; i < extendedMassFunction.length; i++) {
      combined = combine(combined, extendedMassFunction[i]);
    }

    combined.sort((a, b) => b.belief - a.belief);

    const mostProbableDisorders = combined[0];

    console.log(combined);

    return {
      consultationId: newConsultation.id,
      result: mostProbableDisorders,
    };
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
          'consultationDetail',
          'diagnosisResult',
          'diagnosisResult.disorder',
        ],
      },
    );

    this.messageService.setMessage('Get all consultation successfully');

    return this.convertResponse(consultation);
  }

  private convertResponse(
    consultations: Consultation[],
  ): IResAllConsultation[] {
    return consultations.map((consultation: Consultation) => {
      const bestDiagnosis: DiagnosisResult = this.getBestDiagnosis(
        consultation.diagnosisResult,
      );

      const percentage: string = (bestDiagnosis.belief_value * 100).toFixed(0);
      const disorderName: string = bestDiagnosis.disorder?.name ?? 'Unknown';

      return {
        id: consultation.id,
        user: consultation.user.name,
        result: `nilai belief: ${percentage}% ${disorderName}`,
        createdAt: consultation.createdAt,
      };
    });
  }

  private getBestDiagnosis(
    diagnosisResults: DiagnosisResult[],
  ): DiagnosisResult {
    return diagnosisResults.reduce(
      (max, current) =>
        current.belief_value > max.belief_value ? current : max,
      diagnosisResults[0],
    );
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
          'diagnosisResult.disorder',
          'diagnosisResult.disorder.solution',
        ],
      });

    if (!consultation) throw new NotFoundException('Consultation not found');

    const bestDiagnosis: DiagnosisResult = this.getBestDiagnosis(
      consultation.diagnosisResult,
    );

    this.messageService.setMessage('Get detail consultation successfully');

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
      diagnosisResult: consultation.diagnosisResult
        .sort((a, b) => b.belief_value - a.belief_value)
        .map((dr: DiagnosisResult) => ({
          id: dr.id,
          belief_value: parseFloat(dr.belief_value.toFixed(2)),
          disorder: dr.disorder.name,
        })),
      solution: bestDiagnosis.disorder.solution.map(
        (s: Solution) => s.solution,
      ),
      createdAt: consultation.createdAt,
    };
  }
}
