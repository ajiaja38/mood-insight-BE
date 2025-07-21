import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { ILoginResponse, IRefreshTokenResponse } from './dto/tokenResponse.dto';
import { EVersioning } from '../../types/enum/EVersioning.enum';

@Controller({
  path: 'auth',
  version: EVersioning.V1,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  protected loginUserHandler(
    @Body() loginDto: LoginDto,
  ): Promise<ILoginResponse> {
    return this.authService.loginUser(loginDto);
  }

  @Put('refresh-token')
  protected refreshTokenHandler(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IRefreshTokenResponse> {
    return this.authService.verifyRefreshToken(refreshTokenDto.refreshToken);
  }
}
