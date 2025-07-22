import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';

@ApiTags('Orders') // Swagger'da tag sifatida ko‘rinadi
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post(':authId')
  @ApiOperation({ summary: 'Create a new order for a specific user' })
  @ApiParam({ name: 'authId', type: Number, description: 'User (auth) ID' })
  @ApiBody({
    description: 'Foydalanuvchining buyurtmasi',
    type: CreateOrderDto,
    examples: {
      example1: {
        summary: 'Oddiy buyurtma',
        value: {
          items: [
            { productId: 1, quantity: 2 },
            { productId: 4, quantity: 1 },
          ],
        },
      },
    },
  })

  @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
  @ApiResponse({ status: 404, description: 'User or product not found' })
  async createOrder(
    @Param('authId', ParseIntPipe) authId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(createOrderDto, authId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }
}
