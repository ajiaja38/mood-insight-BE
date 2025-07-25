"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBase = void 0;
const disorder_entity_1 = require("../../disorder/model/disorder.entity");
const symptom_entity_1 = require("../../symptom/model/symptom.entity");
const typeorm_1 = require("typeorm");
let KnowledgeBase = class KnowledgeBase {
};
exports.KnowledgeBase = KnowledgeBase;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], KnowledgeBase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => symptom_entity_1.Symptom, (symptom) => symptom.knowledgeBase),
    (0, typeorm_1.JoinColumn)({ name: 'symptom_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], KnowledgeBase.prototype, "symptom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => disorder_entity_1.Disorder, (disorder) => disorder.knowledgeBase),
    (0, typeorm_1.JoinColumn)({ name: 'disorder_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], KnowledgeBase.prototype, "disorder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'float' }),
    __metadata("design:type", Number)
], KnowledgeBase.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], KnowledgeBase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], KnowledgeBase.prototype, "updatedAt", void 0);
exports.KnowledgeBase = KnowledgeBase = __decorate([
    (0, typeorm_1.Entity)({
        name: 'knowledge_base',
    })
], KnowledgeBase);
//# sourceMappingURL=knowledge-base.entity.js.map