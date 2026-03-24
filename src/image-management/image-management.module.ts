import { Module } from '@nestjs/common';
import { ImageManagementService } from './image-management.service';
import { ImageManagementController } from './image-management.controller';

@Module({
  controllers: [ImageManagementController],
  providers: [ImageManagementService],
  exports: [ImageManagementService],
})
export class ImageManagementModule {}
