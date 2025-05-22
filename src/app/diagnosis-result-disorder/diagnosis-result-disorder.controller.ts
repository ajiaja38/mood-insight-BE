import { Controller } from '@nestjs/common';
import { DiagnosisResultDisorderService } from './diagnosis-result-disorder.service';

@Controller('diagnosis-result-disorder')
export class DiagnosisResultDisorderController {
  constructor(private readonly diagnosisResultDisorderService: DiagnosisResultDisorderService) {}
}
