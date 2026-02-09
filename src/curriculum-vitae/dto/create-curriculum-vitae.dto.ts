import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDefined, IsEmail, IsNotEmptyObject, IsNumberString, IsOptional, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { EducationDto } from 'src/shared/dtos/education.dto';
import { Experience } from 'src/shared/dtos/experience.dto';
import { ResidenceDto } from 'src/shared/dtos/Residence.dto';
import { SocialMediaLinks } from 'src/shared/dtos/social-media-links.dto';

export class CreateCurriculumVitaeDto {
  @IsString()
  @MinLength(1)
  fullname: string;

  @MinLength(10)
  @IsNumberString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => ResidenceDto)
  residence: ResidenceDto;

  @ValidateNested()
  @Type(() => SocialMediaLinks)
  @IsOptional()
  profesionalLinks: SocialMediaLinks;

  @IsString()
  resume: string;

  @ValidateNested({each: true})
  @Type(() => Experience)
  @ArrayMinSize(1)
  @IsArray()
  workExperience: Experience[];

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EducationDto)
  education: EducationDto;
}
