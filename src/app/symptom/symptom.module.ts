import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './model/symptom.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom]), MessageModule],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
