import { Lang } from 'src/translations/types/lang.type';
import {
  FormatDateType,
  FormattedDateOptions,
} from './interfaces/FormattedDateOptions.interface';
import { months } from 'src/translations/dictionaries/MonthsDictionary';
import { templateDates } from 'src/translations/dictionaries/FormattedDatesDictionary';

/**
 * Returns a beautiful string date with translations.
 * @param date A date string valid in format YYYY-MM-DD.
 * @param opts Options to generate the string date formatted.
 * @returns A translated string if is necessary in the format specified.
 */
export function formattedDate(
  date: string,
  opts?: FormattedDateOptions,
): string {
  const lang = opts?.lang ?? 'es';
  const format = opts?.format ?? 'long';

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regex))
    throw new Error(
      'formattedDate exception: You should pass a date in YYYY-MM-DD format',
    );

  const dateInstance = new Date(`${date}T00:00:00`);

  if (isNaN(dateInstance.getTime()))
    throw new Error(
      'formattedDate exception: You should use only valid date argument',
    );

  const { day, month, year } = getDateInfo(dateInstance, format, lang);

  const formatted = templateDates[lang][format]({ day, month, year });

  return formatted;
}

function getDateInfo(date: Date, format: FormatDateType, lang: Lang) {
  const month =
    format === 'long'
      ? months[lang][date.getMonth()]
      : addPadZero(date.getMonth() + 1);

  const day = addPadZero(date.getDate());
  const year = date.getFullYear().toString();

  return { month, day, year };
}

function addPadZero(numberDate: number): string {
  return numberDate.toString().padStart(2, '0');
}
