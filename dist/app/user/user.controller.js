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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const EVersioning_enum_1 = require("../../types/enum/EVersioning.enum");
const createUsert_dto_1 = require("./dto/createUsert.dto");
const user_decorator_1 = require("../../decorator/user.decorator");
const jwtAuth_guard_1 = require("../../guard/jwtAuth.guard");
const role_guard_1 = require("../../guard/role.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const updateUsert_dto_1 = require("./dto/updateUsert.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    registerUserHandler(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    registerAdminHandler(createUserDto) {
        return this.userService.createUser(createUserDto, true);
    }
    getAllUserHandler() {
        return this.userService.findAllUser();
    }
    getUserByIDHandler(id) {
        return this.userService.findOneUser(id);
    }
    getUserProfileHandler(user) {
        return this.userService.findOneUser(user.id);
    }
    updateUserHandler(user, updateUserDto) {
        return this.userService.updateUser(user.id, updateUserDto);
    }
    deleteUserHandler(id) {
        return this.userService.deleteUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUsert_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUserHandler", null);
__decorate([
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUsert_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerAdminHandler", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUserHandler", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByIDHandler", null);
__decorate([
    (0, common_1.Get)('data/profile'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfileHandler", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUsert_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserHandler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(ERole_enum_1.ERole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserHandler", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)({
        version: EVersioning_enum_1.EVersioning.V1,
        path: 'user',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map