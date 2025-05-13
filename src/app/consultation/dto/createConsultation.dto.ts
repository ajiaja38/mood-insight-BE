import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateConsultationDto {
  @IsArray()
  @IsNotEmpty()
  symptomIds: string[];
}
