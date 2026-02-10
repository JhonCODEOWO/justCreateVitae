import { IsDateString, IsOptional, IsString } from 'class-validator';

export class Experience {
  @IsString()
  companyName: string;
  @IsString()
  occupation: string;
  @IsDateString()
  @IsString()
  startDate: string;
  @IsOptional()
  endDate?: string;

  @IsString({ each: true })
  @IsOptional()
  achievements?: string[];
}
