import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSolutionDto {
  @IsString()
  @IsNotEmpty()
  disorderId: string;

  @IsString()
  @IsNotEmpty()
  solution: string;
}

export class UpdateSolutionDto {
  @IsString()
  @IsNotEmpty()
  solution: string;
}
