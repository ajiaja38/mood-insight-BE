import { Type } from '../../../types/interface/ITypeClass.interface';
import { DiagnosisResult } from '../../diagnosis-result/model/diagnosis-result.entity';
import { Disorder } from '../../disorder/model/disorder.entity';
export declare class DiagnosisResultDisorder {
    id: string;
    diagnosisResult: DiagnosisResult;
    disorder: Type<Disorder>;
}
