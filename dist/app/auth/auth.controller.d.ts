import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/login.dto';
import { ILoginResponse, IRefreshTokenResponse } from './dto/tokenResponse.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    protected loginUserHandler(loginDto: LoginDto): Promise<ILoginResponse>;
    protected refreshTokenHandler(refreshTokenDto: RefreshTokenDto): Promise<IRefreshTokenResponse>;
}
