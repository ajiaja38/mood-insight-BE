import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisResultDisorderController } from './diagnosis-result-disorder.controller';
import { DiagnosisResultDisorderService } from './diagnosis-result-disorder.service';

describe('DiagnosisResultDisorderController', () => {
  let controller: DiagnosisResultDisorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosisResultDisorderController],
      providers: [DiagnosisResultDisorderService],
    }).compile();

    controller = module.get<DiagnosisResultDisorderController>(DiagnosisResultDisorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
