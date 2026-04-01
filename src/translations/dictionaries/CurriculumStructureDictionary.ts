import { CurriculumSectionsTranslated } from '../interfaces/CurriculumSectionsTranslated.interface';
import { Lang } from '../types/lang.type';

/**
 * Dictionary of every word with its translation based on the lang key.
 */
export const CurriculumStructureDictionary: Record<
  Lang,
  CurriculumSectionsTranslated
> = {
  es: {
    summary: 'Resumen',
    workExperience: 'Experiencia Laboral',
    contact: 'Contacto',
    education: 'Educación',
    languages: 'Idiomas',
    projects: 'Proyectos',
    skills: 'Habilidades',
  },
  en: {
    summary: 'Summary',
    workExperience: 'Work Experience',
    contact: 'Contact',
    education: 'Education',
    languages: 'Languages',
    projects: 'Projects',
    skills: 'Skills',
  },
};

/**
 * Retrieves section titles that are able to use in templates.
 * @param lan A existing language key in the dictionary.
 * @returns A object with every section and its translation
 */
export function getCurriculumTranslatedElement(
  lang: Lang = 'es',
): CurriculumSectionsTranslated {
  return CurriculumStructureDictionary[lang];
}
