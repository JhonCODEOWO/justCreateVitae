import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmptyObject,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EducationDto } from 'src/shared/dtos/education.dto';
import { Experience } from 'src/shared/dtos/experience.dto';
import { ResidenceDto } from 'src/shared/dtos/Residence.dto';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';
import { SkillDto } from './skill.dto';
import { LanguageDTO } from './language.dto';
import { ProjectDTO } from './project.dto';
import { CertificationDTO } from './certifications.dto';

export class CreateCurriculumVitaeDto {
  @IsString()
  @MinLength(1)
  fullname: string;

  @MaxLength(10)
  @MinLength(10)
  @IsNumberString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ResidenceDto)
  residence: ResidenceDto;

  @ValidateNested() //Validate the object inside the key property
  @Type(() => SocialMediaLinks)
  @IsOptional()
  profesionalLinks?: SocialMediaLinks;

  @IsString()
  resume: string;

  @ValidateNested({ each: true }) //Validate every object inside an array
  @Type(() => Experience)
  @ArrayMinSize(1)
  @IsArray()
  workExperience: Experience[];

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => EducationDto)
  education: EducationDto[];

  @ValidateNested({
    each: true,
    message: 'each element must be a valid object based on the request rules',
  })
  @IsArray()
  @IsOptional()
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @ValidateNested({
    each: true,
    message: 'will be a valid object of language information',
  })
  @IsOptional()
  @IsArray()
  @Type(() => LanguageDTO)
  languages?: LanguageDTO[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => ProjectDTO)
  projects?: ProjectDTO[];

  @ValidateNested({ each: true })
  @Type(() => CertificationDTO)
  @IsArray()
  @IsOptional()
  certifications?: CertificationDTO[];
}
