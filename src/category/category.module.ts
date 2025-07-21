import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Products } from 'src/products/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Products])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
