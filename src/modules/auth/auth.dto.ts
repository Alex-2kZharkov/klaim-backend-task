import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;
}
