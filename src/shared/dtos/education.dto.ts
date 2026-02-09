import { IsIn, IsString } from 'class-validator';

export class EducationDto {
  @IsString()
  titleName: string;
  @IsString()
  institutionName: string;
  @IsString()
  graduationDate: string;
  @IsIn(['curso', 'titulo'])
  @IsString()
  type: string;
}
