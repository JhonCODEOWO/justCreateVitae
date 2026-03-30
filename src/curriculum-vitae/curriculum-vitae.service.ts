import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { MapperTemplateData } from 'src/templates/mapper';
import { TemplatesService } from 'src/templates/templates.service';
import { PdfService } from 'src/pdf/pdf.service';
import { CreateCurriculumQueryParamsDto } from './dto/QueryParams.dto';
import { ImageManagementService } from 'src/image-management/image-management.service';
import { Lang, translations } from './language/Translations';
import { DictionaryElement } from './interfaces/Dictionary.interface';
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

    //Make translations
    const estructuralWordsTranslates = this.getSectionsTranslates(lang);

    //Transform image to square size
    const modifiedPicture = await this.imageService.toAvatarSize(
      picture.buffer,
    );

    const dataTemplate = MapperTemplateData.FromDtoToToDataTemplate(
      createCurriculumVitaeDto.data,
      modifiedPicture.toString('base64'),
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

  /**
   * Retrieves section titles that are able to use in templates.
   * @param lan A existing language key in the dictionary.
   * @returns A object with every section and its translation
   */
  getSectionsTranslates(lan?: Lang): DictionaryElement {
    if (!lan) return translations['es'];
    return translations[lan];
  }
}
