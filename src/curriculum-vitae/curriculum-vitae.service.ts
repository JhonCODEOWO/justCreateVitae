import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum-vitae.dto';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { DataTemplate } from 'src/templates/interfaces/DataTemplate.interface';
import { MapperTemplateData } from 'src/templates/mapper';

@Injectable()
export class CurriculumVitaeService {
  async create(createCurriculumVitaeDto: CreateCurriculumVitaeDto) {
    //Access to hbs file of the template requested
    const templateHtml = this.retrieveTextFromFile(
      '../templates',
      'Harvard.hbs',
    );
    const globalCss = this.retrieveTextFromFile(
      '../templates/css',
      'GlobalStyles.css',
    );

    //Create new browser instance
    const browser = await puppeteer.launch();

    //Create the page to set the content
    const page = await browser.newPage();

    //Compile the template and add the data.
    const template = Handlebars.compile<DataTemplate>(templateHtml);
    console.log(
      MapperTemplateData.FromDtoToToDataTemplate(createCurriculumVitaeDto),
    );
    const html = template(
      MapperTemplateData.FromDtoToToDataTemplate(
        createCurriculumVitaeDto,
        globalCss,
      ),
    );

    await page.setContent(html);

    const pdf = await page.pdf({ printBackground: true });

    await browser.close();
    return pdf;
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

  retrieveTextFromFile(path: string, fileName: string) {
    const fullPath = join(__dirname, `${path}/${fileName}`);
    if (!existsSync(fullPath))
      throw new NotFoundException(
        `The file ${fileName} you requested doesn't exists`,
      );
    return readFileSync(fullPath, 'utf-8');
  }
}
