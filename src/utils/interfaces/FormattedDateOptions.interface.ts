import { Lang } from 'src/curriculum-vitae/language/Translations';

export type FormatDateType = 'long' | 'short';

export interface FormattedDateOptions {
  format?: FormatDateType;
  lang?: Lang;
}
