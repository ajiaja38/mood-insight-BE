import { Type } from '../../../types/interface/ITypeClass.interface';
import { ConsultationDetail } from '../../consultation-detail/model/consultation-detail.entity';
import { DiagnosisResult } from '../../diagnosis-result/model/diagnosis-result.entity';
import { User } from '../../user/model/user.entity';
export declare class Consultation {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    user: Type<User>;
    consultationDetail: ConsultationDetail[];
    diagnosisResult: DiagnosisResult[];
}
