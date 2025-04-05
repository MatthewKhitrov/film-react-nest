import { Module } from '@nestjs/common';
import { OrderControllerController } from '../order-controller/order-controller.controller';
import { OrdersService } from '../order-service/order-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmsSchema } from '../../films/film-schema/film-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmsSchema }]),
  ],
  controllers: [OrderControllerController],
  providers: [OrdersService],
})
export class OrdersModule {}
