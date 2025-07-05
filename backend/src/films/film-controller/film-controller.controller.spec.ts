import { Test, TestingModule } from '@nestjs/testing';
import { FilmControllerController } from './film-controller.controller';
import { FilmsService } from '../film-service/film-service';
import { fixtures } from '../../films.fixtures';

describe('FilmControllerController', () => {
  let controller: FilmControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmControllerController],
      providers: [
        FilmsService,
        {
          provide: 'FilmRepository',
          useValue: {
            find: jest.fn().mockResolvedValue([fixtures.film]),
          },
        },
        {
          provide: 'ScheduleRepository',
          useValue: {
            find: jest.fn().mockResolvedValue(fixtures.film.schedule),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmControllerController>(FilmControllerController);
  });

  it('test find all', async () => {
    expect(controller).toBeDefined();
    const findResult = await controller.findAll();
    expect(findResult).toEqual({
      total: 1,
      items: [fixtures.film],
    });
  });

  it('test find one', async () => {
    expect(controller).toBeDefined();
    const findResult = await controller.findOne(
      '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    );
    expect(findResult).toEqual({
      total: fixtures.film.schedule.length,
      items: fixtures.film.schedule.map((item) => ({
        ...item,
        taken: item.taken.split(', '),
      })),
    });
  });
});
