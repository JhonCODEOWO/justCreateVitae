import { IsIn, IsNumber, IsString } from 'class-validator';

export class SkillDto {
  @IsString()
  name: string;
  @IsIn([1, 2, 3, 4, 5])
  @IsNumber()
  level: number;
}
