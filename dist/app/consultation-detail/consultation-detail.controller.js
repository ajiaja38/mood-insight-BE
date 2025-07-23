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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationDetailController = void 0;
const common_1 = require("@nestjs/common");
const consultation_detail_service_1 = require("./consultation-detail.service");
const create_consultation_detail_dto_1 = require("./dto/create-consultation-detail.dto");
const update_consultation_detail_dto_1 = require("./dto/update-consultation-detail.dto");
let ConsultationDetailController = class ConsultationDetailController {
    constructor(consultationDetailService) {
        this.consultationDetailService = consultationDetailService;
    }
    create(createConsultationDetailDto) {
        return this.consultationDetailService.create(createConsultationDetailDto);
    }
    findAll() {
        return this.consultationDetailService.findAll();
    }
    findOne(id) {
        return this.consultationDetailService.findOne(+id);
    }
    update(id, updateConsultationDetailDto) {
        return this.consultationDetailService.update(+id, updateConsultationDetailDto);
    }
    remove(id) {
        return this.consultationDetailService.remove(+id);
    }
};
exports.ConsultationDetailController = ConsultationDetailController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consultation_detail_dto_1.CreateConsultationDetailDto]),
    __metadata("design:returntype", void 0)
], ConsultationDetailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsultationDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationDetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_detail_dto_1.UpdateConsultationDetailDto]),
    __metadata("design:returntype", void 0)
], ConsultationDetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationDetailController.prototype, "remove", null);
exports.ConsultationDetailController = ConsultationDetailController = __decorate([
    (0, common_1.Controller)('consultation-detail'),
    __metadata("design:paramtypes", [consultation_detail_service_1.ConsultationDetailService])
], ConsultationDetailController);
//# sourceMappingURL=consultation-detail.controller.js.map