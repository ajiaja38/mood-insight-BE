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
exports.Symptom = void 0;
const consultation_detail_entity_1 = require("../../consultation-detail/model/consultation-detail.entity");
const knowledge_base_entity_1 = require("../../knowledge-base/model/knowledge-base.entity");
const typeorm_1 = require("typeorm");
let Symptom = class Symptom {
};
exports.Symptom = Symptom;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], Symptom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Symptom.prototype, "symptom", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Symptom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Symptom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => knowledge_base_entity_1.KnowledgeBase, (knowledgeBase) => knowledgeBase.symptom),
    __metadata("design:type", Array)
], Symptom.prototype, "knowledgeBase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => consultation_detail_entity_1.ConsultationDetail, (consultationDetail) => consultationDetail.symptom),
    __metadata("design:type", Array)
], Symptom.prototype, "consultationDetail", void 0);
exports.Symptom = Symptom = __decorate([
    (0, typeorm_1.Entity)()
], Symptom);
//# sourceMappingURL=symptom.entity.js.map