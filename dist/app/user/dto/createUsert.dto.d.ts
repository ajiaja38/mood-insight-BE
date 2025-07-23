import { EGender } from '../../../types/enum/Gender.enum';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    gender: EGender;
}
