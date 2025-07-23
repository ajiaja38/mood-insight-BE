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
exports.Disorder = void 0;
const diagnosis_result_disorder_1 = require("../../diagnosis-result-disorder/model/diagnosis-result-disorder");
const solution_entity_1 = require("../../solution/model/solution.entity");
const typeorm_1 = require("typeorm");
const knowledge_base_entity_1 = require("../../knowledge-base/model/knowledge-base.entity");
let Disorder = class Disorder {
};
exports.Disorder = Disorder;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], Disorder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Disorder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Disorder.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Disorder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Disorder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => knowledge_base_entity_1.KnowledgeBase, (knowledgeBase) => knowledgeBase.disorder),
    __metadata("design:type", Array)
], Disorder.prototype, "knowledgeBase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => solution_entity_1.Solution, (solution) => solution.disorder),
    __metadata("design:type", Array)
], Disorder.prototype, "solution", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => diagnosis_result_disorder_1.DiagnosisResultDisorder, (disorder) => disorder.disorder),
    __metadata("design:type", Array)
], Disorder.prototype, "diagnosisResultDisorder", void 0);
exports.Disorder = Disorder = __decorate([
    (0, typeorm_1.Entity)()
], Disorder);
//# sourceMappingURL=disorder.entity.js.map