import { IsString } from 'class-validator';

export class CertificationDTO {
  @IsString()
  name: string;

  @IsString()
  institution: string;

  @IsString()
  year?: string;
}
