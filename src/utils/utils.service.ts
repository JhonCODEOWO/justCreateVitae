import { Injectable } from '@nestjs/common';
import { FormattedDateOptions } from './format-dates/interfaces/FormattedDateOptions.interface';

@Injectable()
export class UtilsService {
  /**
   * Returns a beautiful string date.
   * @param A string in the format specified.
   */
  formattedDate(date: string, opts: FormattedDateOptions): string {
    const dateInstance = new Date(date);
    console.log(dateInstance);
    return date;
  }
}
