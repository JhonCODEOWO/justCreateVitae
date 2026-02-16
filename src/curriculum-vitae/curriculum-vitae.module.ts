import { Module } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CurriculumVitaeController } from './curriculum-vitae.controller';
import { TemplatesModule } from 'src/templates/templates.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  controllers: [CurriculumVitaeController],
  providers: [CurriculumVitaeService],
  imports: [TemplatesModule, PdfModule],
})
export class CurriculumVitaeModule {}
