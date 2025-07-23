"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const message_module_1 = require("./app/message/message.module");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const exception_filter_1 = require("./filter/exception.filter");
const response_interceptor_1 = require("./interceptor/response.interceptor");
const Logger_middleware_1 = require("./middleware/Logger.middleware");
const user_module_1 = require("./app/user/user.module");
const typeorm_transactional_1 = require("typeorm-transactional");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("./app/auth/auth.module");
const disorder_module_1 = require("./app/disorder/disorder.module");
const symptom_module_1 = require("./app/symptom/symptom.module");
const knowledge_base_module_1 = require("./app/knowledge-base/knowledge-base.module");
const solution_module_1 = require("./app/solution/solution.module");
const consultation_module_1 = require("./app/consultation/consultation.module");
const consultation_detail_module_1 = require("./app/consultation-detail/consultation-detail.module");
const diagnosis_result_module_1 = require("./app/diagnosis-result/diagnosis-result.module");
const diagnosis_result_disorder_module_1 = require("./app/diagnosis-result-disorder/diagnosis-result-disorder.module");
const database_config_1 = require("./config/database.config");
const rag_module_1 = require("./app/rag/rag.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(Logger_middleware_1.AppLoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory() {
                    return {
                        ...database_config_1.datasource.options,
                        autoLoadEntities: true,
                    };
                },
                async dataSourceFactory(options) {
                    if (!options) {
                        throw new Error('Invalid options passed');
                    }
                    return (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(options));
                },
            }),
            message_module_1.MessageModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            disorder_module_1.DisorderModule,
            symptom_module_1.SymptomModule,
            knowledge_base_module_1.KnowledgeBaseModule,
            solution_module_1.SolutionModule,
            consultation_module_1.ConsultationModule,
            consultation_detail_module_1.ConsultationDetailModule,
            diagnosis_result_module_1.DiagnosisResultModule,
            diagnosis_result_disorder_module_1.DiagnosisResultDisorderModule,
            rag_module_1.RagModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.ExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map