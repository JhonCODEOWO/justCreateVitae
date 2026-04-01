import { DataTemplate } from './interfaces/DataTemplate.interface';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';
import { CurriculumFormDataDto } from 'src/curriculum-vitae/dto/curriculum-form-data.dto';
import { formattedDate } from 'src/utils/format-dates/date.utils';
import { Lang } from 'src/translations/types/lang.type';

//TODO: MOVE THIS TO A DEDICATED MODULE i18n
const wordsDictionary: Record<Lang, Record<string, string>> = {
  es: {
    actually: 'Actualmente',
  },
  en: {
    actually: 'Present',
  },
};

export class MapperTemplateData {
  /**
   * Transform a CurriculumFormDataDto instance into a DataTemplate object.
   * @param dto The dto to transform.
   * @param image A base64 string value based on a image file.
   * @returns A object with the DataTemplate structure.
   */
  static FromDtoToToDataTemplate(
    dto: CurriculumFormDataDto,
    image: string,
    lang: Lang = 'es',
  ): DataTemplate {
    return {
      linkedIn: dto.profesionalLinks?.linkedIn ?? '',
      userImg: `data:image/jpeg;base64,${image}`,
      residence: `${dto.residence.city}, ${dto.residence.country}`,
      phoneNumber: /^-?\d+(\.\d+)?$/.test(dto.phoneNumber)
        ? Number(dto.phoneNumber)
        : 0,
      resume: dto.resume,
      mainSite: dto.profesionalLinks?.portfolioWeb,
      languages: dto.languages ?? [],
      projects: dto.projects ?? [],
      skills:
        dto.skills?.map((skill) => ({
          name: skill.name,
          level: this.generateLevelPercent(skill.level),
        })) ?? [],
      education: dto.education.map((edu) => ({
        institutionName: edu.institutionName,
        titleName: edu.titleName,
        graduationDate: formattedDate(edu.graduationDate, {
          format: 'short',
          lang: lang,
        }),
        type: edu.type,
      })),
      email: dto.email,
      fullname: dto.fullname,
      profesionalLinks: dto.profesionalLinks
        ? this.toProfesionalLinksPlain(dto.profesionalLinks)
        : [],
      workExperience: dto.workExperience.map(
        ({
          companyName,
          occupation,
          startDate,
          achievements = [],
          endDate,
        }) => ({
          achievements,
          occupation,
          rangeDate: this.checkTwoDates(startDate, endDate, { lang: lang }),
          companyName,
        }),
      ),
    };
  }

  /**
   * Convert a object SocialMediaLinks a plain object
   * @param object The object to map into a plain object.
   * @returns A plain object.
   */
  static toProfesionalLinksPlain(
    object: SocialMediaLinks,
  ): { name: string; link: string }[] {
    return Object.entries(object)
      .filter(([key, value]) => value != undefined && key != 'linkedIn')
      .map(([key, value]: [string, string]) => ({
        link: value,
        name: key,
      }));
  }

  /**
   * Converts a level value (0–5 scale) into a percentage (0–100).
   * @param levelValue The value to evaluate (expected range 0-5)
   * @returns A percentage value between 0-100.
   */
  static generateLevelPercent(levelValue: number): number {
    const safeValue = Math.max(0, Math.min(levelValue, 5));
    const percentValue = (safeValue * 100) / 5;
    return percentValue;
  }

  /**
   * Check two dates range and generate a string to show it in a nice format to the cv info.
   * @param date1 Start date to use.
   * @param date2 End date to validate, if is undefined or its length is 0 then is a present date.
   * @param opts Options to apply in the generated string
   * @returns A nice string including the two dates if is possible otherwise it will return a string with only one date and the word indicating that the ranges stills continue with the translation.
   */
  static checkTwoDates(
    date1: string,
    date2?: string,
    opts?: { lang: Lang },
  ): string {
    const lang = opts?.lang ?? 'es';
    const formattedDate1 = formattedDate(date1, { lang });

    if (!date2 || date2.length === 0)
      return `${formattedDate1} - ${wordsDictionary[lang].actually}`;

    const formattedDate2 = formattedDate(date2, { lang });

    return `${formattedDate1} - ${formattedDate2}`;
  }
}
