import { Consultation } from '../../consultation/model/consultation.entity';
import { ERole } from '../../../types/enum/ERole.enum';
import { EGender } from '../../../types/enum/Gender.enum';
export declare class User {
    id: string;
    email: string;
    phoneNumber: string;
    name: string;
    password: string;
    address: string;
    role: ERole;
    gender: EGender;
    createdAt: Date;
    updatedAt: Date;
    consultation: Consultation[];
}
