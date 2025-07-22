import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Category } from 'src/category/entity/category.entity';
import { Order } from 'src/order/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category, Order])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductsModule {}
