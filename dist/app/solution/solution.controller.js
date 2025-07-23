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
exports.SolutionController = void 0;
const common_1 = require("@nestjs/common");
const solution_service_1 = require("./solution.service");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
const createSolution_dto_1 = require("./dto/createSolution.dto");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
let SolutionController = class SolutionController {
    constructor(solutionService) {
        this.solutionService = solutionService;
    }
    createSolutionHandler(createSolutionDto) {
        return this.solutionService.createSolution(createSolutionDto);
    }
    findAllSolutionHandler() {
        return this.solutionService.findAllSolution();
    }
    findSolutionByDisorderIdHandler(id) {
        return this.solutionService.findSolutionById(id);
    }
    updateSolutionHandler(id, updateSolutionDto) {
        return this.solutionService.updateSolution(id, updateSolutionDto);
    }
    deleteSolutionHandler(id) {
        return this.solutionService.deleteSolution(id);
    }
};
exports.SolutionController = SolutionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSolution_dto_1.CreateSolutionDto]),
    __metadata("design:returntype", Promise)
], SolutionController.prototype, "createSolutionHandler", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolutionController.prototype, "findAllSolutionHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionController.prototype, "findSolutionByDisorderIdHandler", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createSolution_dto_1.UpdateSolutionDto]),
    __metadata("design:returntype", Promise)
], SolutionController.prototype, "updateSolutionHandler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SolutionController.prototype, "deleteSolutionHandler", null);
exports.SolutionController = SolutionController = __decorate([
    (0, common_1.Controller)({
        path: 'solution',
        version: EVersioning_enum_1.EVersioning.V1,
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [solution_service_1.SolutionService])
], SolutionController);
//# sourceMappingURL=solution.controller.js.map