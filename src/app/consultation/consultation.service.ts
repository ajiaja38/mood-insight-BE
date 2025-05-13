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
import { generateID } from 'src/utils/generateID';
import { Symptom } from '../symptom/model/symptom.entity';
import { Disorder } from '../disorder/model/disorder.entity';

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
    const user: User | null = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) throw new NotFoundException('User not found');

    const lastData: Consultation[] = await this.consultationRepository.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    const lastID: string | null = lastData[0]?.id ?? null;
    const id: string = generateID('C', lastID);

    const newConsultation: Consultation =
      await this.consultationRepository.save({
        id,
        user,
      });

    if (!newConsultation)
      throw new BadRequestException('Failed to create consultation');

    for (const symptomId of symptomIds) {
      const symptom: Symptom | null = await this.symtompRepository.findOneBy({
        id: symptomId,
      });

      if (!symptom) throw new NotFoundException('Symptom not found');

      const lastData: ConsultationDetail[] =
        await this.consultationDetailRepository.find({
          order: {
            id: 'DESC',
          },
          take: 1,
        });

      const lastID: string | null = lastData[0]?.id ?? null;
      const id: string = generateID('CD', lastID);

      const newConsultationDetail: ConsultationDetail =
        await this.consultationDetailRepository.save({
          id,
          consultation: newConsultation,
          symptom,
        });

      if (!newConsultationDetail)
        throw new BadRequestException('Failed to create consultation detail');
    }

    const knowledgeBases: KnowledgeBase[] =
      await this.knowledgeBaseRepository.find({
        where: {
          symptom: {
            id: In(symptomIds),
          },
        },
        relations: ['symptom', 'disorder'],
      });

    const disorderBelief: Map<string, number[]> = new Map();

    for (const kb of knowledgeBases) {
      const disorderId: string = kb.disorder.id;
      const weight: number = kb.weight;

      if (!disorderBelief.has(disorderId)) {
        disorderBelief.set(disorderId, []);
      }

      disorderBelief.get(disorderId)?.push(weight);
    }

    for (const [disorderId, beliefValues] of disorderBelief.entries()) {
      const beliefValue: number = this.demsterShafer(beliefValues);

      const lastData: DiagnosisResult[] =
        await this.diagnosisResultRepository.find({
          order: {
            id: 'DESC',
          },
          take: 1,
        });

      const lastID: string | null = lastData[0]?.id ?? null;
      const id: string = generateID('DR', lastID);

      const newDiagnosisResult: DiagnosisResult =
        await this.diagnosisResultRepository.save({
          id,
          belief_value: beliefValue,
          consultation: newConsultation,
          disorder: { id: disorderId } as Disorder,
        });

      if (!newDiagnosisResult)
        throw new BadRequestException('Failed to create diagnosis result');
    }

    this.messageService.setMessage('Consultation created successfully');
    return newConsultation;
  }

  private demsterShafer(beliefs: number[]): number {
    if (beliefs.length === 0) return 0;
    if (beliefs.length === 1) return beliefs[0];

    let mCombined: number = beliefs[0];

    for (let i = 1; i < beliefs.length; i++) {
      const m1: number = mCombined;
      const m2: number = beliefs[i];

      const conflict: number = (1 - m1) * (1 - m2);
      mCombined = (m1 * m2) / (1 - conflict);
    }

    return mCombined;
  }
}
