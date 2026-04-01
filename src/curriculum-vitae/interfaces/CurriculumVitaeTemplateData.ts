import { DataTemplate } from 'src/templates/interfaces/DataTemplate.interface';
import { CurriculumSectionsTranslated } from 'src/translations/interfaces/CurriculumSectionsTranslated.interface';

/**
 * Interface that defines how the the data to use in every template should looks
 */
export interface CurriculumVitaeTemplateData extends DataTemplate {
  t: CurriculumSectionsTranslated;
}
