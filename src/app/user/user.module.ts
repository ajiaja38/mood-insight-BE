import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { MessageModule } from '../message/message.module';
import { PasswordConfService } from './password.conf.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MessageModule],
  controllers: [UserController],
  providers: [UserService, PasswordConfService],
  exports: [PasswordConfService],
})
export class UserModule {}
