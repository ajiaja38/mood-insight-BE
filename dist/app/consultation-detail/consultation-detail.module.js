"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationDetailModule = void 0;
const common_1 = require("@nestjs/common");
const consultation_detail_service_1 = require("./consultation-detail.service");
const consultation_detail_controller_1 = require("./consultation-detail.controller");
const typeorm_1 = require("@nestjs/typeorm");
const consultation_detail_entity_1 = require("./model/consultation-detail.entity");
const message_module_1 = require("../message/message.module");
let ConsultationDetailModule = class ConsultationDetailModule {
};
exports.ConsultationDetailModule = ConsultationDetailModule;
exports.ConsultationDetailModule = ConsultationDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consultation_detail_entity_1.ConsultationDetail]), message_module_1.MessageModule],
        controllers: [consultation_detail_controller_1.ConsultationDetailController],
        providers: [consultation_detail_service_1.ConsultationDetailService],
    })
], ConsultationDetailModule);
//# sourceMappingURL=consultation-detail.module.js.map