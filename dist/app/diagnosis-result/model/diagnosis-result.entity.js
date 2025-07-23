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
exports.DiagnosisResult = void 0;
const consultation_entity_1 = require("../../consultation/model/consultation.entity");
const diagnosis_result_disorder_1 = require("../../diagnosis-result-disorder/model/diagnosis-result-disorder");
const typeorm_1 = require("typeorm");
let DiagnosisResult = class DiagnosisResult {
};
exports.DiagnosisResult = DiagnosisResult;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], DiagnosisResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], DiagnosisResult.prototype, "belief_value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => diagnosis_result_disorder_1.DiagnosisResultDisorder, (disorder) => disorder.diagnosisResult),
    __metadata("design:type", Array)
], DiagnosisResult.prototype, "diagnosisResultDisorder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consultation_entity_1.Consultation, (consultation) => consultation.diagnosisResult),
    __metadata("design:type", Object)
], DiagnosisResult.prototype, "consultation", void 0);
exports.DiagnosisResult = DiagnosisResult = __decorate([
    (0, typeorm_1.Entity)('diagnosis_result')
], DiagnosisResult);
//# sourceMappingURL=diagnosis-result.entity.js.map