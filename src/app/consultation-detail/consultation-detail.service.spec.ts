import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationDetailService } from './consultation-detail.service';

describe('ConsultationDetailService', () => {
  let service: ConsultationDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationDetailService],
    }).compile();

    service = module.get<ConsultationDetailService>(ConsultationDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
