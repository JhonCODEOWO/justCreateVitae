import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { MapperTemplateData } from 'src/templates/mapper';
import { TemplatesService } from 'src/templates/templates.service';
import { PdfService } from 'src/pdf/pdf.service';
import { CreateCurriculumQueryParamsDto } from './dto/QueryParams.dto';
import { ImageManagementService } from 'src/image-management/image-management.service';
import { getCurriculumTranslatedElement } from '../translations/dictionaries/CurriculumStructureDictionary';
import { CurriculumVitaeTemplateData } from './interfaces/CurriculumVitaeTemplateData';

@Injectable()
export class CurriculumVitaeService {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly pdfService: PdfService,
    private readonly imageService: ImageManagementService,
  ) {}

  async create(
    createCurriculumVitaeDto: CreateCurriculumVitaeDto,
    picture: Express.Multer.File,
    { type = 'Harvard', lang = 'es' }: CreateCurriculumQueryParamsDto,
  ) {
    //Read templates content
    const templateHtml = this.templateService.getTemplate(type);
    const globalCss = this.templateService.getCss('GlobalStyles');

    //Take translations
    const estructuralWordsTranslates = getCurriculumTranslatedElement(lang);

    //Transform image to square size
    const modifiedPicture = await this.imageService.toAvatarSize(
      picture.buffer,
    );

    const dataTemplate = MapperTemplateData.FromDtoToToDataTemplate(
      createCurriculumVitaeDto.data,
      modifiedPicture.toString('base64'),
      lang,
    );

    const pdf = await this.pdfService.createPdf<CurriculumVitaeTemplateData>({
      data: {
        ...dataTemplate,
        t: estructuralWordsTranslates,
      },
      html: templateHtml,
      css: globalCss,
    });

    return pdf;
  }
}
