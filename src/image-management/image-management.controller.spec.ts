import { Test, TestingModule } from '@nestjs/testing';
import { ImageManagementController } from './image-management.controller';
import { ImageManagementService } from './image-management.service';

describe('ImageManagementController', () => {
  let controller: ImageManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageManagementController],
      providers: [ImageManagementService],
    }).compile();

    controller = module.get<ImageManagementController>(ImageManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
