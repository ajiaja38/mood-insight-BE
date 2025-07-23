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
exports.KnowledgeBaseController = void 0;
const common_1 = require("@nestjs/common");
const knowledge_base_service_1 = require("./knowledge-base.service");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
const createKB_dto_1 = require("./dto/createKB.dto");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const updateKB_dto_1 = require("./dto/updateKB.dto");
let KnowledgeBaseController = class KnowledgeBaseController {
    constructor(knowledgeBaseService) {
        this.knowledgeBaseService = knowledgeBaseService;
    }
    createKnowledgeBaseHandler(createKBDto) {
        return this.knowledgeBaseService.createKnowledgeBase(createKBDto);
    }
    getAllKnowledgeBaseHandler() {
        return this.knowledgeBaseService.getAllKnowledgeBase();
    }
    getDetailKnowledgeBaseHandler(id) {
        return this.knowledgeBaseService.getDetailKnowledgeBase(id);
    }
    updateKBByIdHandler(id, updateKbDto) {
        return this.knowledgeBaseService.updateKBById(id, updateKbDto);
    }
    deleteKBByIdHandler(id) {
        return this.knowledgeBaseService.deleteKBById(id);
    }
};
exports.KnowledgeBaseController = KnowledgeBaseController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createKB_dto_1.CreateKBDto]),
    __metadata("design:returntype", Promise)
], KnowledgeBaseController.prototype, "createKnowledgeBaseHandler", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KnowledgeBaseController.prototype, "getAllKnowledgeBaseHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN, ERole_enum_1.ERole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KnowledgeBaseController.prototype, "getDetailKnowledgeBaseHandler", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateKB_dto_1.UpdateKbDto]),
    __metadata("design:returntype", Promise)
], KnowledgeBaseController.prototype, "updateKBByIdHandler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KnowledgeBaseController.prototype, "deleteKBByIdHandler", null);
exports.KnowledgeBaseController = KnowledgeBaseController = __decorate([
    (0, common_1.Controller)({
        path: 'knowledge-base',
        version: EVersioning_enum_1.EVersioning.V1,
    }),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [knowledge_base_service_1.KnowledgeBaseService])
], KnowledgeBaseController);
//# sourceMappingURL=knowledge-base.controller.js.map