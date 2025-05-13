import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './model/consultation.entity';
import { MessageModule } from '../message/message.module';
import { ConsultationDetail } from '../consultation-detail/model/consultation-detail.entity';
import { DiagnosisResult } from '../diagnosis-result/model/diagnosis-result.entity';
import { User } from '../user/model/user.entity';
import { KnowledgeBase } from '../knowledge-base/model/knowledge-base.entity';
import { Symptom } from '../symptom/model/symptom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Consultation,
      ConsultationDetail,
      DiagnosisResult,
      User,
      KnowledgeBase,
      Symptom,
    ]),
    MessageModule,
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
