import { IsEmail, Length, IsOptional, IsFQDN, IsString } from 'class-validator';

export class UserDTO {

  @Length(5, 15)
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  city: string;

  @IsOptional()
  country: string;

  @IsOptional()
  address: string;

  @IsOptional()
  zipCode: string;

  @IsString()
  gender: string;

  @IsOptional()
  @IsFQDN()
  avatar: string;

  @IsOptional()
  archived: boolean;
}
