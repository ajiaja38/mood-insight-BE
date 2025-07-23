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
exports.Consultation = void 0;
const consultation_detail_entity_1 = require("../../consultation-detail/model/consultation-detail.entity");
const diagnosis_result_entity_1 = require("../../diagnosis-result/model/diagnosis-result.entity");
const user_entity_1 = require("../../user/model/user.entity");
const typeorm_1 = require("typeorm");
let Consultation = class Consultation {
};
exports.Consultation = Consultation;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], Consultation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Consultation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.consultation),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], Consultation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => consultation_detail_entity_1.ConsultationDetail, (consultationDetail) => consultationDetail.consultation),
    __metadata("design:type", Array)
], Consultation.prototype, "consultationDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => diagnosis_result_entity_1.DiagnosisResult, (diagnosisResult) => diagnosisResult.consultation),
    __metadata("design:type", Array)
], Consultation.prototype, "diagnosisResult", void 0);
exports.Consultation = Consultation = __decorate([
    (0, typeorm_1.Entity)('consultation')
], Consultation);
//# sourceMappingURL=consultation.entity.js.map