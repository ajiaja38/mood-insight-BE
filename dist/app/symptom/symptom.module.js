"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomModule = void 0;
const common_1 = require("@nestjs/common");
const symptom_service_1 = require("./symptom.service");
const symptom_controller_1 = require("./symptom.controller");
const typeorm_1 = require("@nestjs/typeorm");
const symptom_entity_1 = require("./model/symptom.entity");
const message_module_1 = require("../message/message.module");
let SymptomModule = class SymptomModule {
};
exports.SymptomModule = SymptomModule;
exports.SymptomModule = SymptomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([symptom_entity_1.Symptom]), message_module_1.MessageModule],
        controllers: [symptom_controller_1.SymptomController],
        providers: [symptom_service_1.SymptomService],
    })
], SymptomModule);
//# sourceMappingURL=symptom.module.js.map