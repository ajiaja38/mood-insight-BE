import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './app/message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from './filter/exception.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AppLoggerMiddleware } from './middleware/Logger.middleware';
import { UserModule } from './app/user/user.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './app/auth/auth.module';
import { DisorderModule } from './app/disorder/disorder.module';
import { SymptomModule } from './app/symptom/symptom.module';
import { KnowledgeBaseModule } from './app/knowledge-base/knowledge-base.module';
import { SolutionModule } from './app/solution/solution.module';
import { ConsultationModule } from './app/consultation/consultation.module';
import { ConsultationDetailModule } from './app/consultation-detail/consultation-detail.module';
import { DiagnosisResultModule } from './app/diagnosis-result/diagnosis-result.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    MessageModule,
    UserModule,
    AuthModule,
    DisorderModule,
    SymptomModule,
    KnowledgeBaseModule,
    SolutionModule,
    ConsultationModule,
    ConsultationDetailModule,
    DiagnosisResultModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
