import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class SocialMediaLinks {
  @IsUrl()
  @IsString()
  @IsOptional()
  instagram?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  facebook?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  twitter?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  linkedIn?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  github?: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  portfolioWeb?: string;
}
