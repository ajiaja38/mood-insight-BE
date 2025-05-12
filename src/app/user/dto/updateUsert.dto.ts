import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+62\d{9,13}$/, {
    message:
      'Nomor Telepon harus diawali dengan +62 dan terdiri dari 9-13 angka',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  address: string;
}
