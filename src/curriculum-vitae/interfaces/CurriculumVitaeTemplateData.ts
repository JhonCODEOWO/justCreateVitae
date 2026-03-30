import { DataTemplate } from 'src/templates/interfaces/DataTemplate.interface';
import { DictionaryElement } from './Dictionary.interface';

/**
 * Interface that defines how the the data to use in every template should looks
 */
export interface CurriculumVitaeTemplateData extends DataTemplate {
  t: DictionaryElement;
}
