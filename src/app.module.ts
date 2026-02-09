import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumVitaeModule } from './curriculum-vitae/curriculum-vitae.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CurriculumVitaeModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
