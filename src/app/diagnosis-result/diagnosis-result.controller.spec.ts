import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisResultController } from './diagnosis-result.controller';
import { DiagnosisResultService } from './diagnosis-result.service';

describe('DiagnosisResultController', () => {
  let controller: DiagnosisResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosisResultController],
      providers: [DiagnosisResultService],
    }).compile();

    controller = module.get<DiagnosisResultController>(DiagnosisResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
