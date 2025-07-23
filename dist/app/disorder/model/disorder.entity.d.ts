import { DiagnosisResultDisorder } from '../../diagnosis-result-disorder/model/diagnosis-result-disorder';
import { Solution } from '../../solution/model/solution.entity';
import { KnowledgeBase } from '../../knowledge-base/model/knowledge-base.entity';
export declare class Disorder {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    knowledgeBase: KnowledgeBase[];
    solution: Solution[];
    diagnosisResultDisorder: DiagnosisResultDisorder[];
}
