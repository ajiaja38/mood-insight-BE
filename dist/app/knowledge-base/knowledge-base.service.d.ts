import { KnowledgeBase } from './model/knowledge-base.entity';
import { Repository } from 'typeorm';
import { Symptom } from '../symptom/model/symptom.entity';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageService } from '../message/message.service';
import { CreateKBDto } from './dto/createKB.dto';
import { IKBResponse } from './dto/response.dto';
import { UpdateKbDto } from './dto/updateKB.dto';
export declare class KnowledgeBaseService {
    private readonly knowledgeBaseRepository;
    private readonly symptomRepository;
    private readonly disorderRepository;
    private readonly messageService;
    constructor(knowledgeBaseRepository: Repository<KnowledgeBase>, symptomRepository: Repository<Symptom>, disorderRepository: Repository<Disorder>, messageService: MessageService);
    createKnowledgeBase({ details, }: CreateKBDto): Promise<IKBResponse[]>;
    getAllKnowledgeBase(): Promise<IKBResponse[]>;
    getDetailKnowledgeBase(id: string): Promise<IKBResponse>;
    updateKBById(id: string, { weight }: UpdateKbDto): Promise<IKBResponse>;
    deleteKBById(id: string): Promise<void>;
    private responseBuilder;
}
