import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumVitaeModule } from './curriculum-vitae/curriculum-vitae.module';
import { SharedModule } from './shared/shared.module';
import { TemplatesModule } from './templates/templates.module';
import { PdfModule } from './pdf/pdf.module';
import { ImageManagementModule } from './image-management/image-management.module';
import { UtilsModule } from './utils/utils.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [
    CurriculumVitaeModule,
    SharedModule,
    TemplatesModule,
    PdfModule,
    ImageManagementModule,
    UtilsModule,
    TranslationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
