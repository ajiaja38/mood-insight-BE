import { IsNotEmpty, IsString } from 'class-validator';

export class SymptomDto {
  @IsString()
  @IsNotEmpty()
  symptom: string;
}
