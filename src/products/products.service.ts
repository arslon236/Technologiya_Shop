import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entity/category.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepo: Repository<Products>,
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) { }

    async create(dto: CreateProductDto, images: Express.Multer.File[]) {
        const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
        if (!category) throw new NotFoundException('Category not found');

        const product = this.productRepo.create({
            ...dto,
            category,
        });

        return await this.productRepo.save(product);
    }

    async findAll() {
        return await this.productRepo.find({
            relations: ['category'],
        });
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async update(id: number, dto: UpdateProductDto) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');

        if (dto.categoryId) {
            const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
            if (!category) throw new NotFoundException('Category not found');
            product.category = category;
        }

        Object.assign(product, dto);
        return await this.productRepo.save(product);
    }

    async remove(id: number) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        return await this.productRepo.remove(product);
    }

    // product.service.ts

    async getLatestProducts(limit = 10) {
        return this.productRepo.find({
            order: {
                createdAt: 'DESC',
            },
            take: limit,
        });
    }

}
