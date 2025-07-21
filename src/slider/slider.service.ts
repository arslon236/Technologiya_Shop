// slider.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entity/slider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private sliderRepository: Repository<Slider>,
  ) {}

  create(data: Partial<Slider>) {
    const slider = this.sliderRepository.create(data);
    return this.sliderRepository.save(slider);
  }

  findAll() {
    return this.sliderRepository.find();
  }

  async remove(id: number) {
    const slider = await this.sliderRepository.findOneBy({ id });
    if (slider) {
      await this.sliderRepository.remove(slider);
    }
    return { message: 'Slider deleted' };
  }
}
