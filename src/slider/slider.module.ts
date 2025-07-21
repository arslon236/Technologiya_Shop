import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entity/slider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  controllers: [SliderController],
  providers: [SliderService],
  exports: [SliderService]
})
export class SliderModule {}
