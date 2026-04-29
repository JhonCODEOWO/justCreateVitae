import { plainToInstance, Transform, Type } from 'class-transformer';
import { CurriculumFormDataDto } from './curriculum-form-data.dto';
import { ValidateNested } from 'class-validator';

export class CreateCurriculumVitaeDto {
  /** Property transformed into a Dto class to receive a form-data key as json value and validate it */
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
