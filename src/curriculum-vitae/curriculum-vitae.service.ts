import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum-vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum-vitae.dto';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

@Injectable()
export class CurriculumVitaeService {
  async create(createCurriculumVitaeDto: CreateCurriculumVitaeDto) {
    //Access to the files
    const path = join(__dirname, '../templates/example.html');
    const globalStyles = join(__dirname, '../templates/css/example.css');

    if (!existsSync(path))
      new NotFoundException(`The template that you request doesn't exists`);

    const fileContent = readFileSync(path, 'utf-8');
    const cssContent = readFileSync(globalStyles, 'utf-8');

    //Create new browser instance
    const browser = await puppeteer.launch();

    //Create the page to set the content
    const page = await browser.newPage();

    //Compile the template and add the data.
    const template = Handlebars.compile<CreateCurriculumVitaeDto>(fileContent);
    const html = template(createCurriculumVitaeDto);
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
}
