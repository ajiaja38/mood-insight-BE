export interface IKBResponse {
    id: string;
    symptomId: string;
    symptom: string;
    disorderId: string;
    disorder: string;
    weight: number;
    createdAt?: Date;
    updatedAt?: Date;
}
