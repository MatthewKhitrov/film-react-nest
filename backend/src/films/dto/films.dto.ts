//TODO описать DTO для запросов к /films

import { IsString, IsNumber, IsArray } from 'class-validator';

export class filmsDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsString()
  tags: string;
  @IsString()
  Image: string;
  @IsString()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsArray()
  schedule: [
    {
      daytime: string;
      hall: number;
      id: string;
      price: number;
      rows: number;
      seats: number;
      taken: string;
    },
  ];
}
