import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { IJwtPayload } from '../../../types/interface/IJwtPayload.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(iJwtPayload: IJwtPayload): Promise<IJwtPayload>;
}
export {};
