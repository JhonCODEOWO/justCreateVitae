import { IsOptional } from 'class-validator';

export class SocialMediaLinks {
  @IsOptional()
  instagram: string;
  @IsOptional()
  facebook: string;
  @IsOptional()
  twitter: string;
  @IsOptional()
  linkedIn: string;
  @IsOptional()
  github: string;
  @IsOptional()
  portfolioWeb: string;
}
