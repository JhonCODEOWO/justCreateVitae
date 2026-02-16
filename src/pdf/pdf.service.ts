import { Injectable, OnModuleInit } from '@nestjs/common';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { CreatePdfOptions } from './interfaces/create-pdf-options.interface';

@Injectable()
export class PdfService {
  /**
   * Create a pdf.
   * @param html The html to use in the pdf.
   * @param data Data to incrust in the html.
   * @returns The pdf created ready to process.
   */
  async createPdf<T>({ css = '', data, html }: CreatePdfOptions<T>) {
    //Create new browser instance
    const browser = await puppeteer.launch();

    //Create the page to set the content
    const page = await browser.newPage();

    //Compile the template
    const template = Handlebars.compile<{ data: T; css: string }>(html);

    //Add the data to the template
    const htmlFromTemplate = template({ data, css });

    //Set content to the browser.
    await page.setContent(htmlFromTemplate);

    //Create a pdf of the page.
    const pdf = await page.pdf({ printBackground: true });

    await browser.close();
    return pdf;
  }
}
