import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgeBase } from './model/knowledge-base.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Symptom } from '../symptom/model/symptom.entity';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageService } from '../message/message.service';
import { CreateKBDto } from './dto/createKB.dto';
import { Transactional } from 'typeorm-transactional';
import { generateID } from '../../utils/generateID';
import { IKBResponse } from './dto/response.dto';
import { UpdateKbDto } from './dto/updateKB.dto';

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
          this.symptomRepository.findOneBy({ id: kb.symptomId }),
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

  public async getAllKnowledgeBase(): Promise<IKBResponse[]> {
    const knowledgeBases: KnowledgeBase[] =
      await this.knowledgeBaseRepository.find({
        relations: ['symptom', 'disorder'],
        order: { createdAt: 'ASC' },
      });

    this.messageService.setMessage('Get Knowledgebase successfully');
    return this.responseBuilder(knowledgeBases);
  }

  public async getDetailKnowledgeBase(id: string): Promise<IKBResponse> {
    const knowledgeBases: IKBResponse[] =
      await this.knowledgeBaseRepository.query(
        /* sql */
        `
        SELECT
          kb.id as id,
          s.id as symptomId,
          s.symptom as symptom,
          d.id as disorderId,
          d.name as disorder,
          kb.weight as weight,
          kb.created_at as createdAt,
          kb.updated_at as updatedAt
        FROM knowledge_base as kb
        LEFT JOIN symptom as s ON kb.symptom_id = s.id
        LEFT JOIN disorder as d ON kb.disorder_id = d.id
        WHERE kb.id = '${id}';
        `,
      );

    if (!knowledgeBases.length)
      throw new NotFoundException('Knowledge base is not found');

    this.messageService.setMessage('Get knowledge base by id successfully');
    return knowledgeBases[0];
  }

  public async updateKBById(
    id: string,
    { weight }: UpdateKbDto,
  ): Promise<IKBResponse> {
    const updatedKB: KnowledgeBase | null =
      await this.knowledgeBaseRepository.findOne({
        where: { id },
        relations: ['symptom', 'disorder'],
      });

    if (!updatedKB) throw new NotFoundException('KB not found');

    updatedKB.weight = weight;

    const result: KnowledgeBase =
      await this.knowledgeBaseRepository.save(updatedKB);

    if (!result) throw new BadRequestException('Failed to update KB');

    this.messageService.setMessage('Knowledge base updated successfully');

    return {
      id: result.id,
      symptomId: result.symptom.id,
      symptom: result.symptom.symptom,
      disorderId: result.disorder.id,
      disorder: result.disorder.name,
      weight: result.weight,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  public async deleteKBById(id: string): Promise<void> {
    const deletedKB: DeleteResult = await this.knowledgeBaseRepository.delete({
      id,
    });

    if (!deletedKB.affected) throw new BadRequestException('KB not found');

    this.messageService.setMessage('Knowledge base deleted successfully');
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
