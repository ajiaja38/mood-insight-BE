import { Type } from '../../../types/interface/ITypeClass.interface';
import { Disorder } from '../../disorder/model/disorder.entity';
export declare class Solution {
    id: string;
    solution: string;
    disorder: Type<Disorder>;
    createdAt: Date;
    updatedAt: Date;
}
