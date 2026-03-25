import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ImageManagementService } from './image-management.service';
import { CreateImageManagementDto } from './dto/create-image-management.dto';
import { UpdateImageManagementDto } from './dto/update-image-management.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller('image-management')
export class ImageManagementController {
  constructor(
    private readonly imageManagementService: ImageManagementService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    const buffer = await this.imageManagementService.create(file);

    res.set({
      'Content-Type': `image/jpeg`,
      'Content-Disposition': `attachment; filename=${Date.now()}.jpg`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get()
  findAll() {
    return this.imageManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageManagementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageManagementDto: UpdateImageManagementDto,
  ) {
    return this.imageManagementService.update(+id, updateImageManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageManagementService.remove(+id);
  }
}
