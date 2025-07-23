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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("../message/message.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/model/user.entity");
const typeorm_2 = require("typeorm");
const password_conf_service_1 = require("../user/password.conf.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, passwordConfig, jwtService, configService, messageService) {
        this.userRepository = userRepository;
        this.passwordConfig = passwordConfig;
        this.jwtService = jwtService;
        this.configService = configService;
        this.messageService = messageService;
    }
    async loginUser({ email, password, }) {
        const user = await this.userRepository.findOneBy({
            email,
        });
        if (!user)
            throw new Error('Email or password incorrect');
        const jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        await this.passwordConfig.comparePassword(password, user.password);
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(jwtPayload),
            this.generateRefreshToken(jwtPayload),
        ]);
        this.messageService.setMessage('Login user successfully');
        return { accessToken, refreshToken };
    }
    async generateAccessToken(iJwtPayload) {
        return await this.jwtService.signAsync(iJwtPayload);
    }
    async generateRefreshToken(iJwtPayload) {
        return await this.jwtService.signAsync(iJwtPayload, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: '7d',
        });
    }
    async verifyRefreshToken(refreshToken) {
        const { id, name, email, role } = await this.jwtService.verify(refreshToken, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        });
        if (!id)
            throw new Error('Invalid refresh token');
        this.messageService.setMessage('Refresh token verified successfully');
        const accessToken = await this.generateAccessToken({
            id,
            name,
            email,
            role,
        });
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_conf_service_1.PasswordConfService,
        jwt_1.JwtService,
        config_1.ConfigService,
        message_service_1.MessageService])
], AuthService);
//# sourceMappingURL=auth.service.js.map