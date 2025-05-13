import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeBase } from './model/knowledge-base.entity';
import { Repository } from 'typeorm';
import { Symptom } from '../symptom/model/symptom.entity';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageService } from '../message/message.service';
import { CreateKBDto } from './dto/createKB.dto';
import { Transactional } from 'typeorm-transactional';
import { generateID } from 'src/utils/generateID';
import { IKBResponse } from './dto/response.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(
    @InjectRepository(KnowledgeBase)
    private readonly knowledgeBaseRepository: Repository<KnowledgeBase>,

    @InjectRepository(Symptom)
    private readonly symptomRepository: Repository<Symptom>,

    @InjectRepository(Disorder)
    private readonly disorderRepository: Repository<Disorder>,

    private readonly messageService: MessageService,
  ) {}

  @Transactional()
  public async createKnowledgeBase({
    details,
  }: CreateKBDto): Promise<IKBResponse[]> {
    const knowledgeBases: KnowledgeBase[] = [];

    for (const kb of details) {
      const [symptom, disorder]: [Symptom | null, Disorder | null] =
        await Promise.all([
          this.symptomRepository.findOneBy({ id: kb.sysmptomId }),
          this.disorderRepository.findOneBy({ id: kb.disorderId }),
        ]);

      if (!symptom) throw new NotFoundException('Symptom not found');
      if (!disorder) throw new NotFoundException('Disorder not found');

      const lastData: KnowledgeBase[] = await this.knowledgeBaseRepository.find(
        {
          take: 1,
          order: { id: 'DESC' },
        },
      );

      const lastID: string | null = lastData[0]?.id ?? null;
      const id: string = generateID('KB', lastID);

      const newKB: KnowledgeBase = this.knowledgeBaseRepository.create({
        id,
        symptom,
        disorder,
        weight: kb.weight,
      });

      knowledgeBases.push(newKB);
    }

    const result: KnowledgeBase[] =
      await this.knowledgeBaseRepository.save(knowledgeBases);

    if (!result)
      throw new BadRequestException('Failed to create knowledge base');

    this.messageService.setMessage('Knowledge base created successfully');

    return this.responseBuilder(result);
  }

  private responseBuilder(knowledgeBases: KnowledgeBase[]): IKBResponse[] {
    return knowledgeBases.map((kb: KnowledgeBase) => ({
      id: kb.id,
      symptomId: kb.symptom.id,
      symptom: kb.symptom.symptom,
      disorderId: kb.disorder.id,
      disorder: kb.disorder.name,
      weight: kb.weight,
      createdAt: kb.createdAt,
      updatedAt: kb.updatedAt,
    }));
  }
}
