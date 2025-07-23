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
exports.SymptomController = void 0;
const common_1 = require("@nestjs/common");
const symptom_service_1 = require("./symptom.service");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const symtom_dto_1 = require("./dto/symtom.dto");
let SymptomController = class SymptomController {
    constructor(symptomService) {
        this.symptomService = symptomService;
    }
    createSymptomHandler(createSymptomDto) {
        return this.symptomService.createSymptom(createSymptomDto);
    }
    findAllSymptomHandler() {
        return this.symptomService.findAllSymptom();
    }
    findOneSymptomHandler(id) {
        return this.symptomService.findOneSymptom(id);
    }
    updateSymptomHandler(id, updateSymptomDto) {
        return this.symptomService.updateSymptom(id, updateSymptomDto);
    }
    deleteSymptomHandler(id) {
        return this.symptomService.deleteSymptom(id);
    }
};
exports.SymptomController = SymptomController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [symtom_dto_1.SymptomDto]),
    __metadata("design:returntype", Promise)
], SymptomController.prototype, "createSymptomHandler", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SymptomController.prototype, "findAllSymptomHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SymptomController.prototype, "findOneSymptomHandler", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, symtom_dto_1.SymptomDto]),
    __metadata("design:returntype", Promise)
], SymptomController.prototype, "updateSymptomHandler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SymptomController.prototype, "deleteSymptomHandler", null);
exports.SymptomController = SymptomController = __decorate([
    (0, common_1.Controller)({
        path: 'symptom',
        version: EVersioning_enum_1.EVersioning.V1,
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [symptom_service_1.SymptomService])
], SymptomController);
//# sourceMappingURL=symptom.controller.js.map