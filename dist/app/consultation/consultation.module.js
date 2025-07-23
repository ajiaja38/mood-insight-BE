"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationModule = void 0;
const common_1 = require("@nestjs/common");
const consultation_service_1 = require("./consultation.service");
const consultation_controller_1 = require("./consultation.controller");
const typeorm_1 = require("@nestjs/typeorm");
const consultation_entity_1 = require("./model/consultation.entity");
const message_module_1 = require("../message/message.module");
const consultation_detail_entity_1 = require("../consultation-detail/model/consultation-detail.entity");
const diagnosis_result_entity_1 = require("../diagnosis-result/model/diagnosis-result.entity");
const user_entity_1 = require("../user/model/user.entity");
const knowledge_base_entity_1 = require("../knowledge-base/model/knowledge-base.entity");
const symptom_entity_1 = require("../symptom/model/symptom.entity");
const diagnosis_result_disorder_1 = require("../diagnosis-result-disorder/model/diagnosis-result-disorder");
let ConsultationModule = class ConsultationModule {
};
exports.ConsultationModule = ConsultationModule;
exports.ConsultationModule = ConsultationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                consultation_entity_1.Consultation,
                consultation_detail_entity_1.ConsultationDetail,
                diagnosis_result_entity_1.DiagnosisResult,
                user_entity_1.User,
                knowledge_base_entity_1.KnowledgeBase,
                symptom_entity_1.Symptom,
                diagnosis_result_disorder_1.DiagnosisResultDisorder,
            ]),
            message_module_1.MessageModule,
        ],
        controllers: [consultation_controller_1.ConsultationController],
        providers: [consultation_service_1.ConsultationService],
    })
], ConsultationModule);
//# sourceMappingURL=consultation.module.js.map