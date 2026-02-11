import { CreateCurriculumVitaeDto } from 'src/curriculum-vitae/dto/create-curriculum-vitae.dto';
import { DataTemplate } from './interfaces/DataTemplate.interface';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';

export class MapperTemplateData {
  static FromDtoToToDataTemplate(
    dto: CreateCurriculumVitaeDto,
    globalCss: string = '',
  ): DataTemplate {
    return {
      residence: `${dto.residence.city}, ${dto.residence.country}`,
      globalStyles: globalCss,
      phoneNumber: /^-?\d+(\.\d+)?$/.test(dto.phoneNumber)
        ? Number(dto.phoneNumber)
        : 0,
      resume: dto.resume,
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
}
