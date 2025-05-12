import { Test, TestingModule } from '@nestjs/testing';
import { DisorderService } from './disorder.service';

describe('DisorderService', () => {
  let service: DisorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisorderService],
    }).compile();

    service = module.get<DisorderService>(DisorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
