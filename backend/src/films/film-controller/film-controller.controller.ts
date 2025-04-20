import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../film-service/film-service';

@Controller('films')
export class FilmControllerController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get() /* GET /api/afisha/films/ */ 
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule') /* GET /api/afisha/films/:id/schedule  */ 
  findOne(
    @Param('id') id: string,
  ) {
    return this.filmsService.find(id);
  }
}
