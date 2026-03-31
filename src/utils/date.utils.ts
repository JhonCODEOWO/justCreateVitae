import { Lang } from 'src/curriculum-vitae/language/Translations';
import {
  FormatDateType,
  FormattedDateOptions,
} from './interfaces/FormattedDateOptions.interface';
import { BadRequestException } from '@nestjs/common';

//TODO: MOVE THIS TO A DEDICATED MODULE i18n
const months: Record<Lang, string[]> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};

interface TemplateArgs {
  month: string;
  day: string;
  year: string;
}

/**
 * Templates to present date strings in different languages based on language and format.
 */
export const templateDates: Record<
  Lang,
  Record<FormatDateType, ({ day, month, year }: TemplateArgs) => string>
> = {
  en: {
    long: ({ day, month, year }) => `${month} ${day}, ${year}`,
    short: ({ day, month, year }) => `${month}/${day}/${year}`,
  },
  es: {
    long: ({ day, month, year }) => `${day} de ${month} de ${year}`,
    short: ({ day, month, year }) => `${day}/${month}/${year}`,
  },
};

/**
 * Returns a beautiful string date with translations.
 * @param date A date string valid.
 * @param opts Options to generate the string date formatted.
 * @returns A translated string if is necessary in the format specified.
 */
export function formattedDate(
  date: string,
  opts?: FormattedDateOptions,
): string {
  const lang = opts?.lang ?? 'es';
  const format = opts?.format ?? 'long';

  const dateInstance = new Date(`${date}T00:00:00`);

  if (isNaN(dateInstance.getTime()))
    throw new BadRequestException(
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

export function getTemplateDate(lang: Lang, format: FormatDateType) {
  return templateDates[lang][format];
}
