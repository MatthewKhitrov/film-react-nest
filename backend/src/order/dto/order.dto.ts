//TODO реализовать DTO для /orders
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class ordersDto {
  email: string;
  phone: string;
  tickets: {
    day: string;
    daytime: string;
    film: string;
    price: number;
    row: number;
    seat: number;
    session: string;
    time: string;
  }[];
}
