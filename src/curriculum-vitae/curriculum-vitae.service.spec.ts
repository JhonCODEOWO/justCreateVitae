import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumVitaeService } from './curriculum-vitae.service';

describe('CurriculumVitaeService', () => {
  let service: CurriculumVitaeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurriculumVitaeService],
    }).compile();

    service = module.get<CurriculumVitaeService>(CurriculumVitaeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
