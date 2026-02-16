import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [TemplatesModule],
})
export class PdfModule {}
