import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(['user', 'admin', 'superadmin'], {
    message: 'Role faqat user, admin yoki superadmin bo‘lishi kerak',
  })
  role?: 'user' | 'admin' | 'superadmin'; // optional, default `user` bo'ladi
}
