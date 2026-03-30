import { DictionaryElement } from '../interfaces/Dictionary.interface';

export type Lang = 'es' | 'en';

/**
 * Dictionary of every word with its translation based on the lang key.
 */
export const translations: Record<Lang, DictionaryElement> = {
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
