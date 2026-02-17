import { Controller, Post, Body, Res } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import type { Response } from 'express';

@Controller('curriculum-vitae')
export class CurriculumVitaeController {
  constructor(
    private readonly curriculumVitaeService: CurriculumVitaeService,
  ) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createCurriculumVitaeDto: CreateCurriculumVitaeDto,
  ) {
    const buffer = await this.curriculumVitaeService.create(
      createCurriculumVitaeDto,
    );
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${createCurriculumVitaeDto.fullname}-${Date.now()}.pdf`,
      'Content-Length': buffer.length,
    });

    response.end(buffer);
  }
}
