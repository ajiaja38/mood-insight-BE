import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationDetailController } from './consultation-detail.controller';
import { ConsultationDetailService } from './consultation-detail.service';

describe('ConsultationDetailController', () => {
  let controller: ConsultationDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationDetailController],
      providers: [ConsultationDetailService],
    }).compile();

    controller = module.get<ConsultationDetailController>(
      ConsultationDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
