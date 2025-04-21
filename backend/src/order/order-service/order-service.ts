import { Injectable } from '@nestjs/common';
import { ordersDto } from '../dto/order.dto';
import { Film } from '../../films/film-schema/film-schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../order-schema/order-schema-sql';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async createOrder(OrdersDto: ordersDto) {
    const ticketsArray = OrdersDto.tickets;
    let items = [];

    for (const ticket of ticketsArray) {
      const filmDate = await this.scheduleRepository.findOne({
        where: {
          id: ticket.session,
        },
      });

      if (!filmDate) {
        throw new Error(`Film with id ${ticket.film} not found`);
      }

      const place = `${ticket.row}:${ticket.seat}`;

      if (filmDate.taken == '') {
        filmDate.taken = place;
      } else {
        filmDate.taken = `${filmDate.taken}, ${place}`;
      }

      await this.scheduleRepository.save(filmDate);

      items = [...items, filmDate];
    }
    return { total: items.length, items: items };
  }
}
