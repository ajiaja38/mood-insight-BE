import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { EValBelief } from 'src/types/enum/EValueBelief.enum';

class DetailKBDto {
  @IsString()
  @IsNotEmpty()
  sysmptomId: string;

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
