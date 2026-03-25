import { Injectable } from '@nestjs/common';
import { CreateImageManagementDto } from './dto/create-image-management.dto';
import { UpdateImageManagementDto } from './dto/update-image-management.dto';
import sharp from 'sharp';

@Injectable()
export class ImageManagementService {
  create(file: Express.Multer.File) {
    return this.toAvatarSize(file.buffer);
  }

  findAll() {
    return `This action returns all imageManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageManagement`;
  }

  update(id: number, updateImageManagementDto: UpdateImageManagementDto) {
    return `This action updates a #${id} imageManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageManagement`;
  }

  toAvatarSize(file: Buffer) {
    return sharp(file).resize(200, 200).webp({ quality: 80 }).toBuffer();
  }
}
