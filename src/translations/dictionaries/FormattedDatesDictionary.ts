import { Lang } from 'src/translations/types/lang.type';
import { FormatDateType } from 'src/utils/format-dates/interfaces/FormattedDateOptions.interface';
import { TemplateArgs } from '../interfaces/FormattedDatesArgs';

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
 * A helper function to get directly the function reference.
 * @param lang The language to use.
 * @param format The format to get.
 * @returns A reference function to execute and retrieve the formatted string.
 */
export function getTemplateDateFn(lang: Lang, format: FormatDateType) {
  return templateDates[lang][format];
}
