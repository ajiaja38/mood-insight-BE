import { IsNotEmpty, IsString } from 'class-validator';

export class DisorderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
