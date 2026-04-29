import {
  Controller,
  Post,
  Body,
  Res,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  BadRequestException,
  FileTypeValidator,
} from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import 'multer';
import type { Response } from 'express';
import { CreateCurriculumQueryParamsDto } from './dto/QueryParams.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('curriculum-vitae')
export class CurriculumVitaeController {
  constructor(
    private readonly curriculumVitaeService: CurriculumVitaeService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Res() response: Response,
    @Body() createCurriculumVitaeDto: CreateCurriculumVitaeDto,
    @Query() type: CreateCurriculumQueryParamsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    picture: Express.Multer.File,
  ) {
    if (!picture)
      throw new BadRequestException(
        `The field picture with a file is required`,
      );

    const buffer = await this.curriculumVitaeService.create(
      createCurriculumVitaeDto,
      picture,
      type,
    );
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${createCurriculumVitaeDto.data.fullname}-${Date.now()}.pdf`,
      'Content-Length': buffer.length,
    });

    response.end(buffer);
  }
}
