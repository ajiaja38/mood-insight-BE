import { EValBelief } from '../../../types/enum/EValueBelief.enum';
declare class DetailKBDto {
    symptomId: string;
    disorderId: string;
    weight: EValBelief;
}
export declare class CreateKBDto {
    details: DetailKBDto[];
}
export {};
