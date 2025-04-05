import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ordersDto } from '../dto/order.dto';
import { Film } from '../../films/film-schema/film-schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Film.name) private orderModel: Model<Film>) {}

  async createOrder(OrdersDto: ordersDto) {
    const items = [];
    for (const ticket of OrdersDto.tickets) {
      const newOrders = await this.orderModel.findOne({ id: ticket.film });

      const order = newOrders.schedule.filter(
        (item) => item.id == ticket.session,
      );

      order[0].taken.push(`${ticket.row}:${ticket.seat}`);

      const ordersUpdate = newOrders.schedule.filter(
        (item) => item.id !== ticket.session,
      );

      ordersUpdate.push(order[0]);
      items.push(order[0]);

      newOrders.schedule = ordersUpdate;

      await this.orderModel.updateOne(
        { id: newOrders.id },
        { schedule: newOrders.schedule },
      );
    }

    return {
      total: items.length,
      items: items,
    };
  }
}
