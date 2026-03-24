import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { DataTemplate } from 'src/templates/interfaces/DataTemplate.interface';
import { MapperTemplateData } from 'src/templates/mapper';
import { TemplatesService } from 'src/templates/templates.service';
import { PdfService } from 'src/pdf/pdf.service';
import { CreateCurriculumQueryParamsDto } from './dto/QueryParams.dto';

@Injectable()
export class CurriculumVitaeService {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly pdfService: PdfService,
  ) {}

  async create(
    createCurriculumVitaeDto: CreateCurriculumVitaeDto,
    picture: Express.Multer.File,
    { type = 'Harvard' }: CreateCurriculumQueryParamsDto,
  ) {
    //Read templates content
    const templateHtml = this.templateService.getTemplate(type);
    const globalCss = this.templateService.getCss('GlobalStyles');

    //Convert img to base64
    const srcImg = picture.buffer.toString('base64');

    const pdf = await this.pdfService.createPdf<DataTemplate>({
      data: MapperTemplateData.FromDtoToToDataTemplate(
        createCurriculumVitaeDto,
        srcImg,
      ),
      html: templateHtml,
      css: globalCss,
    });

    return pdf;
  }
}
