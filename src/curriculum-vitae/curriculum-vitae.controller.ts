import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum-vitae.dto';

@Controller('curriculum-vitae')
export class CurriculumVitaeController {
  constructor(
    private readonly curriculumVitaeService: CurriculumVitaeService,
  ) {}

  @Post()
  create(@Body() createCurriculumVitaeDto: CreateCurriculumVitaeDto) {
    return this.curriculumVitaeService.create(createCurriculumVitaeDto);
  }

  @Get()
  findAll() {
    return this.curriculumVitaeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumVitaeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurriculumVitaeDto: UpdateCurriculumVitaeDto,
  ) {
    return this.curriculumVitaeService.update(+id, updateCurriculumVitaeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curriculumVitaeService.remove(+id);
  }
}
