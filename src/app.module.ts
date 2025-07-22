import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { Auth } from './auth/entity/auth.entity';
import { Products } from './products/entity/products.entity';
import { SliderModule } from './slider/slider.module';
import { Slider } from './slider/entity/slider.entity';
import { OrderModule } from './order/order.module';
import { OrderItem } from './order/entity/order.item.entity';
import { Order } from './order/entity/order.entity';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 54326,
    username: "postgres",
    password: "arslon789",
    database: "phone_shop",
    entities: [Category, Auth, Products, Slider, OrderItem, Order],
    synchronize: true
  }),
    AuthModule,
    CategoryModule,
    ProductsModule,
    SliderModule,
    OrderModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
