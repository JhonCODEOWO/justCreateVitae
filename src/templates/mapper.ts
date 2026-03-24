import { CreateCurriculumVitaeDto } from 'src/curriculum-vitae/dto/create-curriculum-vitae.dto';
import { DataTemplate } from './interfaces/DataTemplate.interface';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';

export class MapperTemplateData {
  static FromDtoToToDataTemplate(
    dto: CreateCurriculumVitaeDto,
    image: string,
  ): DataTemplate {
    return {
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

  static toProfesionalLinksPlain(
    object: SocialMediaLinks,
  ): { name: string; link: string }[] {
    return Object.entries(object)
      .filter(([key, value]) => value != undefined)
      .map(([key, value]: [string, string]) => ({
        link: value,
        name: key,
      }));
  }

  static generateLevelPercent(levelValue: number): number {
    const safeValue = Math.max(0, Math.min(levelValue, 5));
    const percentValue = (safeValue * 100) / 5;
    return percentValue;
  }
}
