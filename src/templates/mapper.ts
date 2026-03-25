import { DataTemplate } from './interfaces/DataTemplate.interface';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';
import { CurriculumFormDataDto } from 'src/curriculum-vitae/dto/curriculum-form-data.dto';

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
        graduationDate: edu.graduationDate,
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
          startDate,
          companyName,
          endDate,
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
}
