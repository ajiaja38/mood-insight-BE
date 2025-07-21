import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { EValBelief } from '../../../types/enum/EValueBelief.enum';

class DetailKBDto {
  @IsString()
  @IsNotEmpty()
  symptomId: string;

  @IsString()
  @IsNotEmpty()
  disorderId: string;

  @IsNumber()
  @IsEnum(EValBelief)
  @Min(0)
  @Max(1)
  weight: EValBelief;
}

export class CreateKBDto {
  @IsArray()
  @IsNotEmpty()
  details: DetailKBDto[];
}
