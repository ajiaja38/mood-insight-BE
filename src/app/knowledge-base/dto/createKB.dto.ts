import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

class DetailKBDto {
  @IsString()
  @IsNotEmpty()
  sysmptomId: string;

  @IsString()
  @IsNotEmpty()
  disorderId: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  weight: number;
}

export class CreateKBDto {
  @IsArray()
  @IsNotEmpty()
  details: DetailKBDto[];
}
