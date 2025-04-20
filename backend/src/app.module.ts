import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/film-module/film-module';
import { OrdersModule } from './order/order-module/order-module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Film } from './films/film-schema/film-schema-sql';
import { Schedule } from './order/order-schema/order-schema-sql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: process.env.DATABASE_SCHEMA,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Film, Schedule],
      synchronize: false,
    }),
    FilmsModule,
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
