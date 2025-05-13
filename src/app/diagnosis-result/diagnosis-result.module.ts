import { Module } from '@nestjs/common';
import { DiagnosisResultService } from './diagnosis-result.service';
import { DiagnosisResultController } from './diagnosis-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisResult } from './model/diagnosis-result.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosisResult]), MessageModule],
  controllers: [DiagnosisResultController],
  providers: [DiagnosisResultService],
})
export class DiagnosisResultModule {}
