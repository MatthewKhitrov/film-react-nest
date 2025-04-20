//TODO описать DTO для запросов к /films

import { IsString, IsNumber, IsArray } from 'class-validator';

export class filmsDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: [];
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
  schedule: [];
}
