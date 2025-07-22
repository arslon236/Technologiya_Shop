import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order.item.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Auth } from 'src/auth/entity/auth.entity';
import { Products } from 'src/products/entity/products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Auth, Products])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
