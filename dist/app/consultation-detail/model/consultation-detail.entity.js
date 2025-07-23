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
exports.ConsultationDetail = void 0;
const consultation_entity_1 = require("../../consultation/model/consultation.entity");
const symptom_entity_1 = require("../../symptom/model/symptom.entity");
const typeorm_1 = require("typeorm");
let ConsultationDetail = class ConsultationDetail {
};
exports.ConsultationDetail = ConsultationDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], ConsultationDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => symptom_entity_1.Symptom, (symptom) => symptom.consultationDetail),
    (0, typeorm_1.JoinColumn)({ name: 'symptom_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ConsultationDetail.prototype, "symptom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consultation_entity_1.Consultation, (consultation) => consultation.consultationDetail),
    (0, typeorm_1.JoinColumn)({ name: 'consultation_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ConsultationDetail.prototype, "consultation", void 0);
exports.ConsultationDetail = ConsultationDetail = __decorate([
    (0, typeorm_1.Entity)('consultation_detail')
], ConsultationDetail);
//# sourceMappingURL=consultation-detail.entity.js.map