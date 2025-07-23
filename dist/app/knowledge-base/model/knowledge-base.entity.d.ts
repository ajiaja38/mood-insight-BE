import { Type } from '../../../types/interface/ITypeClass.interface';
import { Disorder } from '../../disorder/model/disorder.entity';
import { Symptom } from '../../symptom/model/symptom.entity';
export declare class KnowledgeBase {
    id: string;
    symptom: Type<Symptom>;
    disorder: Type<Disorder>;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
}
