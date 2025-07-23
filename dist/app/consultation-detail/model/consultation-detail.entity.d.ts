import { Type } from '../../../types/interface/ITypeClass.interface';
import { Consultation } from '../../consultation/model/consultation.entity';
import { Symptom } from '../../symptom/model/symptom.entity';
export declare class ConsultationDetail {
    id: string;
    symptom: Type<Symptom>;
    consultation: Type<Consultation>;
}
