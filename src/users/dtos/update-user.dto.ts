import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  // Basically what this does is if we even don't specify a password and
  // Email, the validation won't throw an error
  @IsOptional()
  password: string;
}
