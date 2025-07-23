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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("../message/message.service");
const password_conf_service_1 = require("./password.conf.service");
const createUsert_dto_1 = require("./dto/createUsert.dto");
const user_entity_1 = require("./model/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const generateID_1 = require("../../utils/generateID");
const ERole_enum_1 = require("../../types/enum/ERole.enum");
const typeorm_transactional_1 = require("typeorm-transactional");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    constructor(userRepository, messageService, passwordService) {
        this.userRepository = userRepository;
        this.messageService = messageService;
        this.passwordService = passwordService;
    }
    async createUser(createUserDto, isAdmin) {
        const lastData = await this.userRepository.find({
            take: 1,
            order: { id: 'DESC' },
        });
        const lastID = lastData[0]?.id ?? null;
        const id = (0, generateID_1.generateID)('U', lastID);
        const password = await this.passwordService.hashPassword(createUserDto.password);
        const user = await this.userRepository.save({
            id,
            email: createUserDto.email,
            name: createUserDto.name,
            phoneNumber: createUserDto.phoneNumber,
            password,
            address: createUserDto.address,
            gender: createUserDto.gender,
            role: isAdmin ? ERole_enum_1.ERole.ADMIN : ERole_enum_1.ERole.USER,
        });
        if (!user)
            throw new common_1.BadRequestException('Failed to create user');
        const serializedUser = (0, class_transformer_1.plainToInstance)(user_entity_1.User, user);
        this.messageService.setMessage('User created successfully');
        return serializedUser;
    }
    findAllUser() {
        this.messageService.setMessage('Get all user successfully');
        return this.userRepository.find({
            select: [
                'id',
                'name',
                'email',
                'phoneNumber',
                'address',
                'gender',
                'role',
            ],
            order: { createdAt: 'ASC' },
        });
    }
    async findOneUser(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        this.messageService.setMessage('Get user successfully');
        return user;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.findOneUser(id);
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existing = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (existing && existing.id !== id)
                throw new common_1.BadRequestException('Email already in use');
        }
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.phoneNumber = updateUserDto.phoneNumber;
        user.address = updateUserDto.address;
        const updatedUser = await this.userRepository.save(user);
        if (!updatedUser)
            throw new common_1.BadRequestException('Failed to update user');
        this.messageService.setMessage('Update user successfully');
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await this.userRepository.delete({ id });
        if (!deletedUser.affected)
            throw new common_1.NotFoundException('User not found');
        this.messageService.setMessage('User deleted successfully');
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUsert_dto_1.CreateUserDto, Boolean]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        message_service_1.MessageService,
        password_conf_service_1.PasswordConfService])
], UserService);
//# sourceMappingURL=user.service.js.map