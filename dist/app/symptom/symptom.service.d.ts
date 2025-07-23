import { Symptom } from './model/symptom.entity';
import { Repository } from 'typeorm';
import { MessageService } from '../message/message.service';
import { SymptomDto } from './dto/symtom.dto';
export declare class SymptomService {
    private readonly symptomRepository;
    private readonly messageService;
    constructor(symptomRepository: Repository<Symptom>, messageService: MessageService);
    createSymptom({ symptom }: SymptomDto): Promise<Symptom>;
    findAllSymptom(): Promise<Symptom[]>;
    findOneSymptom(id: string): Promise<Symptom>;
    updateSymptom(id: string, { symptom }: SymptomDto): Promise<Symptom>;
    deleteSymptom(id: string): Promise<void>;
}
