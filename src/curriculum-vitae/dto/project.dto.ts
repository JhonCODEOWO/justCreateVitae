import { IsString, IsOptional } from 'class-validator';

export class ProjectDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  link?: string;
}
