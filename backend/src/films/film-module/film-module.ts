import { Module } from '@nestjs/common';
import { FilmControllerController } from '../film-controller/film-controller.controller';
import { FilmsService } from '../film-service/film-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmsSchema } from '../film-schema/film-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmsSchema }]),
  ],
  controllers: [FilmControllerController],
  providers: [FilmsService],
})
export class FilmsModule {}
