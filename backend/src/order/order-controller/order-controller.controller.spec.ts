import { fixtures } from '../../films.fixtures';
import { OrderControllerController } from './order-controller.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../order-service/order-service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../../films/film-schema/film-schema';
import { Schedule } from '../order-schema/order-schema-sql';
import { ordersDto } from '../dto/order.dto';

describe("OrderControllerController", () => {
  let controller: OrderControllerController;
  let ordersService: OrdersService;

  const mockOrderDto: ordersDto = {
    email: "xxx@xxx.ru",
    phone: "+77777777",
    tickets: [{
      session: "6a0d0a68-2f74-4164-aac5-45e0e07adb86",
      row: 4,
      seat: 6,
      film: "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      day: "2024-06-30",
      daytime: "12:00:53",
      time: "12:00",
      price: 350
    }]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderControllerController],
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              ...fixtures.film.schedule[0],
              taken: "4:5"
            }),
            save: jest.fn().mockImplementation((schedule) => Promise.resolve(schedule)),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderControllerController>(OrderControllerController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order successfully', async () => {
    const result = await controller.createOrder(mockOrderDto);
    expect(result).toEqual({
      total: 1,
      items: expect.any(Array)
    });
  });
});