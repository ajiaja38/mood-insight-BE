import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisResultDisorderService } from './diagnosis-result-disorder.service';

describe('DiagnosisResultDisorderService', () => {
  let service: DiagnosisResultDisorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosisResultDisorderService],
    }).compile();

    service = module.get<DiagnosisResultDisorderService>(DiagnosisResultDisorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
