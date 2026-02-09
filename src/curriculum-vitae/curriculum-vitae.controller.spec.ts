import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumVitaeController } from './curriculum-vitae.controller';
import { CurriculumVitaeService } from './curriculum-vitae.service';

describe('CurriculumVitaeController', () => {
  let controller: CurriculumVitaeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurriculumVitaeController],
      providers: [CurriculumVitaeService],
    }).compile();

    controller = module.get<CurriculumVitaeController>(CurriculumVitaeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
