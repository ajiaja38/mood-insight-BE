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
exports.DisorderController = void 0;
const common_1 = require("@nestjs/common");
const disorder_service_1 = require("./disorder.service");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const createDisorder_dto_1 = require("./dto/createDisorder.dto");
let DisorderController = class DisorderController {
    constructor(disorderService) {
        this.disorderService = disorderService;
    }
    createDisorderHandler(createDisorderDto) {
        return this.disorderService.createDisorder(createDisorderDto);
    }
    findAllDisorderHandler() {
        return this.disorderService.findAllDisorder();
    }
    findOneDisorderHandler(id) {
        return this.disorderService.findOneDisorder(id);
    }
    updateDisorderHandler(id, updateDisorderDto) {
        return this.disorderService.updateDisorder(id, updateDisorderDto);
    }
    deleteDisorderHandler(id) {
        return this.disorderService.deleteDisorder(id);
    }
};
exports.DisorderController = DisorderController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createDisorder_dto_1.DisorderDto]),
    __metadata("design:returntype", Promise)
], DisorderController.prototype, "createDisorderHandler", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisorderController.prototype, "findAllDisorderHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisorderController.prototype, "findOneDisorderHandler", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createDisorder_dto_1.DisorderDto]),
    __metadata("design:returntype", Promise)
], DisorderController.prototype, "updateDisorderHandler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisorderController.prototype, "deleteDisorderHandler", null);
exports.DisorderController = DisorderController = __decorate([
    (0, common_1.Controller)({
        path: 'disorder',
        version: EVersioning_enum_1.EVersioning.V1,
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [disorder_service_1.DisorderService])
], DisorderController);
//# sourceMappingURL=disorder.controller.js.map