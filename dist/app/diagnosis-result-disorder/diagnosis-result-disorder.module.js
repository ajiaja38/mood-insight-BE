"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisResultDisorderModule = void 0;
const common_1 = require("@nestjs/common");
const diagnosis_result_disorder_service_1 = require("./diagnosis-result-disorder.service");
const diagnosis_result_disorder_controller_1 = require("./diagnosis-result-disorder.controller");
let DiagnosisResultDisorderModule = class DiagnosisResultDisorderModule {
};
exports.DiagnosisResultDisorderModule = DiagnosisResultDisorderModule;
exports.DiagnosisResultDisorderModule = DiagnosisResultDisorderModule = __decorate([
    (0, common_1.Module)({
        controllers: [diagnosis_result_disorder_controller_1.DiagnosisResultDisorderController],
        providers: [diagnosis_result_disorder_service_1.DiagnosisResultDisorderService],
    })
], DiagnosisResultDisorderModule);
//# sourceMappingURL=diagnosis-result-disorder.module.js.map