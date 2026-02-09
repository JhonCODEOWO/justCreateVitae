import { MinLength } from 'class-validator';

export class ResidenceDto {
  @MinLength(5)
  city: string;

  @MinLength(5)
  country: string;
}
