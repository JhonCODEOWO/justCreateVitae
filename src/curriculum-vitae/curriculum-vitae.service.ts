import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum-vitae.dto';

@Injectable()
export class CurriculumVitaeService {
  create(createCurriculumVitaeDto: CreateCurriculumVitaeDto) {
    return 'This action adds a new curriculumVitae';
  }

  findAll() {
    return `This action returns all curriculumVitae`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curriculumVitae`;
  }

  update(id: number, updateCurriculumVitaeDto: UpdateCurriculumVitaeDto) {
    return `This action updates a #${id} curriculumVitae`;
  }

  remove(id: number) {
    return `This action removes a #${id} curriculumVitae`;
  }
}
