import { Test, TestingModule } from '@nestjs/testing';
import { DisorderController } from './disorder.controller';
import { DisorderService } from './disorder.service';

describe('DisorderController', () => {
  let controller: DisorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisorderController],
      providers: [DisorderService],
    }).compile();

    controller = module.get<DisorderController>(DisorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
