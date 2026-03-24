import { PartialType } from '@nestjs/mapped-types';
import { CreateImageManagementDto } from './create-image-management.dto';

export class UpdateImageManagementDto extends PartialType(CreateImageManagementDto) {}
