import { Controller, Post, Body, Res, Query } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import type { Response } from 'express';
import { CreateCurriculumQueryParamsDto } from './dto/QueryParams.dto';

@Controller('curriculum-vitae')
export class CurriculumVitaeController {
  constructor(
    private readonly curriculumVitaeService: CurriculumVitaeService,
  ) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createCurriculumVitaeDto: CreateCurriculumVitaeDto,
    @Query() type: CreateCurriculumQueryParamsDto,
  ) {
    const buffer = await this.curriculumVitaeService.create(
      createCurriculumVitaeDto,
      type,
    );
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${createCurriculumVitaeDto.fullname}-${Date.now()}.pdf`,
      'Content-Length': buffer.length,
    });

    response.end(buffer);
  }
}
