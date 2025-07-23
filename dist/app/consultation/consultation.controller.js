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
exports.ConsultationController = void 0;
const common_1 = require("@nestjs/common");
const consultation_service_1 = require("./consultation.service");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const createConsultation_dto_1 = require("./dto/createConsultation.dto");
const user_decorator_1 = require("../../decorator/user.decorator");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
let ConsultationController = class ConsultationController {
    constructor(consultationService) {
        this.consultationService = consultationService;
    }
    createConsultation(user, createConsultationDto) {
        return this.consultationService.createConsultation(user.id, createConsultationDto);
    }
    getAllConsultationHandler() {
        return this.consultationService.findAllConsultation();
    }
    getAllUserConsultationHandler(user) {
        return this.consultationService.findAllConsultation(user.id);
    }
    getDetailConsultationHandler(id) {
        return this.consultationService.findDetailConsultation(id);
    }
};
exports.ConsultationController = ConsultationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createConsultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "createConsultation", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getAllConsultationHandler", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getAllUserConsultationHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultationController.prototype, "getDetailConsultationHandler", null);
exports.ConsultationController = ConsultationController = __decorate([
    (0, common_1.Controller)({
        path: 'consultation',
        version: EVersioning_enum_1.EVersioning.V1,
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [consultation_service_1.ConsultationService])
], ConsultationController);
//# sourceMappingURL=consultation.controller.js.map