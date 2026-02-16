export interface CreatePdfOptions<T> {
  html: string;
  css?: string;
  data: T;
}
