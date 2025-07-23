"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisResultModule = void 0;
const common_1 = require("@nestjs/common");
const diagnosis_result_service_1 = require("./diagnosis-result.service");
const diagnosis_result_controller_1 = require("./diagnosis-result.controller");
const typeorm_1 = require("@nestjs/typeorm");
const diagnosis_result_entity_1 = require("./model/diagnosis-result.entity");
const message_module_1 = require("../message/message.module");
let DiagnosisResultModule = class DiagnosisResultModule {
};
exports.DiagnosisResultModule = DiagnosisResultModule;
exports.DiagnosisResultModule = DiagnosisResultModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([diagnosis_result_entity_1.DiagnosisResult]), message_module_1.MessageModule],
        controllers: [diagnosis_result_controller_1.DiagnosisResultController],
        providers: [diagnosis_result_service_1.DiagnosisResultService],
    })
], DiagnosisResultModule);
//# sourceMappingURL=diagnosis-result.module.js.map