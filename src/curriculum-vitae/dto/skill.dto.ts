import { IsIn, IsNumberString, IsString } from 'class-validator';

export class SkillDto {
  @IsString()
  name: string;
  @IsIn(['1', '2', '3', '4', '5'])
  @IsNumberString()
  level: number;
}
