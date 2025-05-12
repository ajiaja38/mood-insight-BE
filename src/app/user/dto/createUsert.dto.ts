import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { EGender } from 'src/types/enum/Gender.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password harus terdiri dari 6 karakter terdiri dari huruf kecil, huruf besar, angka, dan simbol[@$!%*?&]',
    },
  )
  password: string;

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

  @IsEnum(EGender)
  @IsNotEmpty()
  gender: EGender;
}
