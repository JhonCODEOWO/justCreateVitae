import { PartialType } from '@nestjs/mapped-types';
import { CreateCurriculumVitaeDto } from './create-curriculum-vitae.dto';

export class UpdateCurriculumVitaeDto extends PartialType(CreateCurriculumVitaeDto) {}
