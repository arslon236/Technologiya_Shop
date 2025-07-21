import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly CategoryRepo: Repository<Category>) {
    }

    async create(dto: CreateCategoryDto) {
        const category = this.CategoryRepo.create(dto)
        await this.CategoryRepo.save(category)
        return { success: true, message: '✅ Kategoriya yaratildi', data: category }
    }

    async findAll() {
        return await this.CategoryRepo.find()
    }

    async findOne(id: number) {
        const category = await this.CategoryRepo.findOne({
            where: { id },
            relations: ['products'], // bu yerda mahsulotlar ham yuklanadi
        });

        if (!category) {
            throw new NotFoundException("Kategoriya topilmadi");
        }

        return {
            success: true,
            data: category,
        };
    }


    async update(id: number, dto: UpdateCategoryDto) {
        const category = await this.CategoryRepo.preload({ id, ...dto })
        if (!category) {
            throw new NotFoundException("Categoriya topilmadi")
        }

        await this.CategoryRepo.save(category)
        return {
            success: true,
            message: 'kategoriya yangilandi',
            category
        }


    }

}
