import { Module } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CurriculumVitaeController } from './curriculum-vitae.controller';
import { TemplatesModule } from 'src/templates/templates.module';
import { PdfModule } from 'src/pdf/pdf.module';
import { ImageManagementModule } from 'src/image-management/image-management.module';

@Module({
  controllers: [CurriculumVitaeController],
  providers: [CurriculumVitaeService],
  imports: [TemplatesModule, PdfModule, ImageManagementModule],
})
export class CurriculumVitaeModule {}
