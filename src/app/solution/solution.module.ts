import { Module } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from './model/solution.entity';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, Disorder]), MessageModule],
  controllers: [SolutionController],
  providers: [SolutionService],
})
export class SolutionModule {}
