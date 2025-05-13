import { Module } from '@nestjs/common';
import { ConsultationDetailService } from './consultation-detail.service';
import { ConsultationDetailController } from './consultation-detail.controller';

@Module({
  controllers: [ConsultationDetailController],
  providers: [ConsultationDetailService],
})
export class ConsultationDetailModule {}
