import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { DataTemplate } from 'src/templates/interfaces/DataTemplate.interface';
import { MapperTemplateData } from 'src/templates/mapper';
import { TemplatesService } from 'src/templates/templates.service';
import { PdfService } from 'src/pdf/pdf.service';

@Injectable()
export class CurriculumVitaeService {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly pdfService: PdfService,
  ) {}

  async create(createCurriculumVitaeDto: CreateCurriculumVitaeDto) {
    //Read templates content
    const templateHtml = this.templateService.getTemplate();
    const globalCss = this.templateService.getCss('GlobalStyles');

    const pdf = await this.pdfService.createPdf<DataTemplate>({
      data: MapperTemplateData.FromDtoToToDataTemplate(
        createCurriculumVitaeDto,
      ),
      html: templateHtml,
      css: globalCss,
    });

    return pdf;
  }
}
