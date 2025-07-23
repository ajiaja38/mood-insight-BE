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
exports.DiagnosisResultDisorder = void 0;
const diagnosis_result_entity_1 = require("../../diagnosis-result/model/diagnosis-result.entity");
const disorder_entity_1 = require("../../disorder/model/disorder.entity");
const typeorm_1 = require("typeorm");
let DiagnosisResultDisorder = class DiagnosisResultDisorder {
};
exports.DiagnosisResultDisorder = DiagnosisResultDisorder;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], DiagnosisResultDisorder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => diagnosis_result_entity_1.DiagnosisResult, (diagnosisResult) => diagnosisResult.diagnosisResultDisorder),
    __metadata("design:type", diagnosis_result_entity_1.DiagnosisResult)
], DiagnosisResultDisorder.prototype, "diagnosisResult", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => disorder_entity_1.Disorder, (disorder) => disorder.diagnosisResultDisorder),
    __metadata("design:type", Object)
], DiagnosisResultDisorder.prototype, "disorder", void 0);
exports.DiagnosisResultDisorder = DiagnosisResultDisorder = __decorate([
    (0, typeorm_1.Entity)('diagnosis_result_disorder')
], DiagnosisResultDisorder);
//# sourceMappingURL=diagnosis-result-disorder.js.map