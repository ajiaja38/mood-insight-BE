import { Module } from '@nestjs/common';
import { DiagnosisResultDisorderService } from './diagnosis-result-disorder.service';
import { DiagnosisResultDisorderController } from './diagnosis-result-disorder.controller';

@Module({
  controllers: [DiagnosisResultDisorderController],
  providers: [DiagnosisResultDisorderService],
})
export class DiagnosisResultDisorderModule {}
