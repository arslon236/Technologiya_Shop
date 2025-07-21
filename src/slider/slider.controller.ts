import {
  Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Body,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSliderDto } from './dto/create-slider.dto';
import { SliderService } from './slider.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) { }

  @Post()
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/slider',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + extname(file.originalname);
        cb(null, uniqueName);
      }
    })
  }))

  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateSliderDto
  ) {
    if (!image) {
      throw new BadRequestException('Rasm fayli majburiy');
    }

    return this.sliderService.create({
      ...body,
      image: image.filename
    });
  }

  // create(
  //   @UploadedFile() image: Express.Multer.File,
  //   @Body() body: CreateSliderDto
  // ) {
  //   return this.sliderService.create({
  //     ...body,
  //     image: image?.filename ?? null // image bo‘lmasa null bo‘ladi
  //   });
  // }

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sliderService.remove(id);
  }
}
