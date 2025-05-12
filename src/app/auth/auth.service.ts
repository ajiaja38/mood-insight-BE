import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/model/user.entity';
import { Repository } from 'typeorm';
import { ILoginResponse, IRefreshTokenResponse } from './dto/tokenResponse.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordConfService } from '../user/password.conf.service';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly passwordConfig: PasswordConfService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
  ) {}

  public async loginUser({
    email,
    password,
  }: LoginDto): Promise<ILoginResponse> {
    const user: User | null = await this.userRepository.findOneBy({
      email,
    });

    if (!user) throw new Error('Email or password incorrect');

    const jwtPayload: IJwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    await this.passwordConfig.comparePassword(password, user.password);

    const [accessToken, refreshToken]: string[] = await Promise.all([
      this.generateAccessToken(jwtPayload),
      this.generateRefreshToken(jwtPayload),
    ]);

    this.messageService.setMessage('Login successfully');

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(iJwtPayload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(iJwtPayload);
  }

  private async generateRefreshToken(
    iJwtPayload: IJwtPayload,
  ): Promise<string> {
    return await this.jwtService.signAsync(iJwtPayload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });
  }

  public async verifyRefreshToken(
    refreshToken: string,
  ): Promise<IRefreshTokenResponse> {
    const { id, name, email, role }: IJwtPayload = await this.jwtService.verify(
      refreshToken,
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      },
    );

    if (!id) throw new Error('Invalid refresh token');

    this.messageService.setMessage('Refresh token verified successfully');

    const accessToken: string = await this.generateAccessToken({
      id,
      name,
      email,
      role,
    });

    return { accessToken };
  }
}
