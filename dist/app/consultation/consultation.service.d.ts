import { Consultation } from './model/consultation.entity';
import { Repository } from 'typeorm';
import { ConsultationDetail } from '../consultation-detail/model/consultation-detail.entity';
import { DiagnosisResult } from '../diagnosis-result/model/diagnosis-result.entity';
import { MessageService } from '../message/message.service';
import { User } from '../user/model/user.entity';
import { KnowledgeBase } from '../knowledge-base/model/knowledge-base.entity';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { Symptom } from '../symptom/model/symptom.entity';
import { IResAllConsultation, IResDetailConsultation } from './dto/response.dto';
import { DiagnosisResultDisorder } from '../diagnosis-result-disorder/model/diagnosis-result-disorder';
import { IResNewConsultation } from './interface/respomse.interface';
export declare class ConsultationService {
    private readonly consultationRepository;
    private readonly consultationDetailRepository;
    private readonly diagnosisResultRepository;
    private readonly diagnosisResultDisorderRepository;
    private readonly userRepository;
    private readonly knowledgeBaseRepository;
    private readonly symtompRepository;
    private readonly messageService;
    constructor(consultationRepository: Repository<Consultation>, consultationDetailRepository: Repository<ConsultationDetail>, diagnosisResultRepository: Repository<DiagnosisResult>, diagnosisResultDisorderRepository: Repository<DiagnosisResultDisorder>, userRepository: Repository<User>, knowledgeBaseRepository: Repository<KnowledgeBase>, symtompRepository: Repository<Symptom>, messageService: MessageService);
    createConsultation(userId: string, { symptomIds }: CreateConsultationDto): Promise<IResNewConsultation>;
    private dempsterShafer;
    findAllConsultation(userId?: string): Promise<IResAllConsultation[]>;
    findDetailConsultation(id: string): Promise<IResDetailConsultation>;
}
