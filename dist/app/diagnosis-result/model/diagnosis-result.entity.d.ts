import { Type } from '../../../types/interface/ITypeClass.interface';
import { Consultation } from '../../consultation/model/consultation.entity';
import { DiagnosisResultDisorder } from '../../diagnosis-result-disorder/model/diagnosis-result-disorder';
export declare class DiagnosisResult {
    id: string;
    belief_value: number;
    diagnosisResultDisorder: DiagnosisResultDisorder[];
    consultation: Type<Consultation>;
}
