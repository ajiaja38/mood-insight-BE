import { MessageService } from '../message/message.service';
import { User } from '../user/model/user.entity';
import { Repository } from 'typeorm';
import { ILoginResponse, IRefreshTokenResponse } from './dto/tokenResponse.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordConfService } from '../user/password.conf.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private readonly passwordConfig;
    private readonly jwtService;
    private readonly configService;
    private readonly messageService;
    constructor(userRepository: Repository<User>, passwordConfig: PasswordConfService, jwtService: JwtService, configService: ConfigService, messageService: MessageService);
    loginUser({ email, password, }: LoginDto): Promise<ILoginResponse>;
    private generateAccessToken;
    private generateRefreshToken;
    verifyRefreshToken(refreshToken: string): Promise<IRefreshTokenResponse>;
}
