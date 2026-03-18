import { IsIn, IsString } from 'class-validator';

export class LanguageDTO {
  @IsString()
  name: string;
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'])
  @IsString()
  level: string;
}
