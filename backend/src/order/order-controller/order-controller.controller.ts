import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from '../order-service/order-service';
import { ordersDto } from '../dto/order.dto';

@Controller('order')
export class OrderControllerController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() OrderDto: ordersDto) {
    return this.ordersService.createOrder(OrderDto);
  }
}
