import { ConsultationDetail } from '../../consultation-detail/model/consultation-detail.entity';
import { KnowledgeBase } from '../../knowledge-base/model/knowledge-base.entity';
export declare class Symptom {
    id: string;
    symptom: string;
    createdAt: Date;
    updatedAt: Date;
    knowledgeBase: KnowledgeBase[];
    consultationDetail: ConsultationDetail[];
}
