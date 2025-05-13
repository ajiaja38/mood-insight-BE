import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { EValBelief } from 'src/types/enum/EValueBelief.enum';

export class UpdateKbDto {
  @IsNumber()
  @IsEnum(EValBelief)
  @Min(0)
  @Max(1)
  weight: EValBelief;
}
