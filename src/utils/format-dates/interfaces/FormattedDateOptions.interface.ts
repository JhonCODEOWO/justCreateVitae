import { Lang } from 'src/translations/types/lang.type';

export type FormatDateType = 'long' | 'short';

export interface FormattedDateOptions {
  format?: FormatDateType;
  lang?: Lang;
}
