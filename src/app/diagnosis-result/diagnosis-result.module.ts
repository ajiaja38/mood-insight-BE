import { Module } from '@nestjs/common';
import { DiagnosisResultService } from './diagnosis-result.service';
import { DiagnosisResultController } from './diagnosis-result.controller';

@Module({
  controllers: [DiagnosisResultController],
  providers: [DiagnosisResultService],
})
export class DiagnosisResultModule {}
