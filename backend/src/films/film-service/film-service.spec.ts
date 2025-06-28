import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './film-service';
import { fixtures } from '../../films.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../film-schema/film-schema-sql';
import { Schedule } from '../../order/order-schema/order-schema-sql';


describe('FilmService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            find: jest.fn().mockResolvedValue(fixtures.films.items),
          },
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            find: jest.fn().mockResolvedValue(fixtures.film.schedule),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test find all', async () => {
    const films = await service.findAll();
    expect(films).toEqual({
      total: fixtures.films.items.length,
      items: fixtures.films.items,
    });
  });

  it('test find one', async () => {
    const schedule = await service.find(fixtures.film.id);
    expect(schedule).toEqual({
      total: fixtures.film.schedule.length,
      items: fixtures.film.schedule.map(item => ({
        ...item,
        taken: item.taken.split(', '),
      })),
    });
  });
});