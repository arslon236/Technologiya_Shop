import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order.item.entity';
import { Products } from 'src/products/entity/products.entity';
import { Auth } from 'src/auth/entity/auth.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>, // ⚠️ to'g'rilangan: User emas, Auth
    ) { }

    async createOrder(createOrderDto: CreateOrderDto, authId: number): Promise<Order> {
        const auth = await this.authRepository.findOne({ where: { id: authId } });
        if (!auth) {
            throw new NotFoundException('User (auth) not found');
        }

        let totalPrice = 0;
        const items: OrderItem[] = [];

        for (const item of createOrderDto.items) {
            const product = await this.productRepository.findOne({
                where: { id: item.productId },
            });

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.productId} not found`);
            }

            if (product.quantity === 0) {
                throw new BadRequestException(`Product "${product.title}" is out of stock`);
            }

            if (product.quantity < item.quantity) {
                throw new BadRequestException(
                    `Only ${product.quantity} items of "${product.title}" are available`
                );
            }

            // Mahsulotdan buyurtma miqdorini ayiramiz
            product.quantity -= item.quantity;
            await this.productRepository.save(product);

            const orderItem = this.orderItemRepository.create({
                product,
                quantity: item.quantity,
            });

            totalPrice += Number(product.price) * item.quantity;
            items.push(orderItem);
        }

        const order = this.orderRepository.create({
            auth,
            items,
            totalPrice,
            status: 'pending',
        });

        await this.orderItemRepository.save(items);
        return await this.orderRepository.save(order);
    }





    async getAllOrders(): Promise<any[]> {
        const orders = await this.orderRepository.find({
            relations: ['auth', 'items', 'items.product'],
            order: { createdAt: 'DESC' },
        });

        return orders.map(order => {
            const auth: any = order.auth;
            if (auth) {
                delete auth.password;
                delete auth.role;
            }
            return order;
        });

    }


    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['auth', 'items', 'items.product'],
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }
}
