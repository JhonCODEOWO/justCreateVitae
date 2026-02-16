import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumVitaeModule } from './curriculum-vitae/curriculum-vitae.module';
import { SharedModule } from './shared/shared.module';
import { TemplatesModule } from './templates/templates.module';
import { PdfModule } from './pdf/pdf/pdf.module';
import { PdfModule } from './pdf/pdf.module';
import { PdfModule } from './pdf/pdf/pdf.module';

@Module({
  imports: [CurriculumVitaeModule, SharedModule, TemplatesModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
