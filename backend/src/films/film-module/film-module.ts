import { Module } from '@nestjs/common';
import { FilmControllerController } from '../film-controller/film-controller.controller';
import { FilmsService } from '../film-service/film-service';
import { Film } from '../film-schema/film-schema-sql'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/order/order-schema/order-schema-sql';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmControllerController],
  providers: [FilmsService],
})
export class FilmsModule {}
