import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisResultService } from './diagnosis-result.service';

describe('DiagnosisResultService', () => {
  let service: DiagnosisResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosisResultService],
    }).compile();

    service = module.get<DiagnosisResultService>(DiagnosisResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
