import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/film-module/film-module';
import { OrdersModule } from './order/order-module/order-module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    FilmsModule,
    OrdersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/prac'),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
