"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBaseModule = void 0;
const common_1 = require("@nestjs/common");
const knowledge_base_service_1 = require("./knowledge-base.service");
const knowledge_base_controller_1 = require("./knowledge-base.controller");
const typeorm_1 = require("@nestjs/typeorm");
const knowledge_base_entity_1 = require("./model/knowledge-base.entity");
const symptom_entity_1 = require("../symptom/model/symptom.entity");
const disorder_entity_1 = require("../disorder/model/disorder.entity");
const message_module_1 = require("../message/message.module");
let KnowledgeBaseModule = class KnowledgeBaseModule {
};
exports.KnowledgeBaseModule = KnowledgeBaseModule;
exports.KnowledgeBaseModule = KnowledgeBaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([knowledge_base_entity_1.KnowledgeBase, symptom_entity_1.Symptom, disorder_entity_1.Disorder]),
            message_module_1.MessageModule,
        ],
        controllers: [knowledge_base_controller_1.KnowledgeBaseController],
        providers: [knowledge_base_service_1.KnowledgeBaseService],
    })
], KnowledgeBaseModule);
//# sourceMappingURL=knowledge-base.module.js.map