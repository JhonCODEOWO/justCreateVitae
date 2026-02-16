import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

@Injectable()
export class TemplatesService {
  private readonly basePath = __dirname;
  private readonly globalCssPath = join(this.basePath, '/css/globalStyles');
  private readonly templatesPath = join(this.basePath, 'template-files');

  /**
   * Read text from a existing file.
   * @param stylesName The name of the file stored in css folder to read.
   * @returns A string with all the css content
   */
  getCss(stylesName: string): string {
    return this.readFileFrom(this.globalCssPath, `${stylesName}.css`);
  }

  /**
   * Read text from a existing hbs or html file in templates-files folder
   * @param templateName The name of the template to read
   * @param extension Extension of the file to read (html or hbs)
   * @returns A string with all contents
   */
  getTemplate(
    templateName: 'Harvard' = 'Harvard',
    extension: 'hbs' | 'html' = 'hbs',
  ) {
    return this.readFileFrom(
      this.templatesPath,
      `${templateName}.${extension}`,
    );
  }

  /**
   * Read content from a file.
   * @param folderPath The path of the file to read.
   * @param fileName The filename with the extensions included.
   * @returns A string with the content of the file.
   */
  private readFileFrom(folderPath: string, fileName: string) {
    const fullPath = resolve(folderPath, fileName);

    if (!folderPath.startsWith(this.basePath))
      throw new BadRequestException(
        `The file that you request exists outside of the module.`,
      );

    if (!existsSync(fullPath))
      throw new NotFoundException(
        `The file ${fileName} you requested doesn't exists`,
      );
    return readFileSync(fullPath, 'utf-8');
  }
}
