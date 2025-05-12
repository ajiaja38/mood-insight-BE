import { Module } from '@nestjs/common';
import { DisorderService } from './disorder.service';
import { DisorderController } from './disorder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disorder } from './model/disorder.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Disorder]), MessageModule],
  controllers: [DisorderController],
  providers: [DisorderService],
})
export class DisorderModule {}
