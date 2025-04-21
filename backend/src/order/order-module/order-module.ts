import { Module } from '@nestjs/common';
import { OrderControllerController } from '../order-controller/order-controller.controller';
import { OrdersService } from '../order-service/order-service';
import { Film,  } from '../../films/film-schema/film-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../order-schema/order-schema-sql';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderControllerController],
  providers: [OrdersService],
})
export class OrdersModule {}
