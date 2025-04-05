import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../film-schema/film-schema';
import { Model } from 'mongoose';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll() {
    const films = await this.filmModel.find();

    return {
      total: films.length,
      items: films,
    };
  }

  async findOne(id) {
    const film = await this.filmModel.findOne({ id });
    if (!film) throw new NotFoundException('Film Not found');

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
