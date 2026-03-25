import { IsIn, IsString } from 'class-validator';
import { type TemplateName } from 'src/templates/types/template-name';

export class CreateCurriculumQueryParamsDto {
  @IsIn(['Modern', 'Harvard', 'Ats'])
  @IsString({
    message:
      'The query param type should be a string and exists in query params',
  })
  type: TemplateName;
}
