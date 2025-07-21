import { Controller } from '@nestjs/common';
import { DiagnosisResultService } from './diagnosis-result.service';

@Controller('diagnosis-result')
export class DiagnosisResultController {
  constructor(
    private readonly diagnosisResultService: DiagnosisResultService,
  ) {}
}
