import { SymptomService } from './symptom.service';
import { Symptom } from './model/symptom.entity';
import { SymptomDto } from './dto/symtom.dto';
export declare class SymptomController {
    private readonly symptomService;
    constructor(symptomService: SymptomService);
    protected createSymptomHandler(createSymptomDto: SymptomDto): Promise<Symptom>;
    protected findAllSymptomHandler(): Promise<Symptom[]>;
    protected findOneSymptomHandler(id: string): Promise<Symptom>;
    protected updateSymptomHandler(id: string, updateSymptomDto: SymptomDto): Promise<Symptom>;
    protected deleteSymptomHandler(id: string): Promise<void>;
}
