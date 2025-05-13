import { Module } from '@nestjs/common';
import { ConsultationDetailService } from './consultation-detail.service';
import { ConsultationDetailController } from './consultation-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationDetail } from './model/consultation-detail.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultationDetail]), MessageModule],
  controllers: [ConsultationDetailController],
  providers: [ConsultationDetailService],
})
export class ConsultationDetailModule {}
