import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
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

  @ValidateNested()
  @Type(() => SocialMediaLinks)
  @IsOptional()
  profesionalLinks?: SocialMediaLinks;

  @IsString()
  resume: string;

  @ValidateNested({ each: true })
  @Type(() => Experience)
  @ArrayMinSize(1)
  @IsArray()
  workExperience: Experience[];

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => EducationDto)
  education: EducationDto[];
}
