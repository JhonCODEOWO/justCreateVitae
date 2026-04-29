import { IsDate, IsOptional, IsString } from 'class-validator';

export class CertificationDTO {
  @IsString()
  name: string;

  @IsString()
  institution: string;

  @IsString()
  @IsOptional()
  year?: string;
}
