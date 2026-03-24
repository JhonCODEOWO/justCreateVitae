import { plainToInstance, Transform, Type } from 'class-transformer';
import { CurriculumFormDataDto } from './curriculum-form-data.dto';
import { ValidateNested } from 'class-validator';

export class CreateCurriculumVitaeDto {
  @Transform(
    ({ value }): CurriculumFormDataDto => {
      return plainToInstance(
        CurriculumFormDataDto,
        JSON.parse(value as string),
      );
    },
    { toClassOnly: true },
  )
  @ValidateNested()
  @Type(() => CurriculumFormDataDto)
  data: CurriculumFormDataDto;
}
