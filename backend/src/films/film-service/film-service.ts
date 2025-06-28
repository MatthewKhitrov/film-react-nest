import { Injectable, NotFoundException } from '@nestjs/common';
import { Film } from '../film-schema/film-schema-sql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../order/order-schema/order-schema-sql';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ){}

  async findAll() {
    const films = await this.filmRepository.find();

    return {
      total: films.length,
      items: films,
    };
  }

  async find(id: string) {
    const data = await this.scheduleRepository.find({
      where: { filmId: id },
    });

    const schedule = data.map((item) => {
      return {
        ...item,
        taken: item.taken.split(', '),
      };
    });

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
