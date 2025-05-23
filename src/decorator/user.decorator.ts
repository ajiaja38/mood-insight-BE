import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IJwtPayload } from '../types/interface/IJwtPayload.interface';

export const User: (...dataOrPipes: unknown[]) => ParameterDecorator =
  createParamDecorator(
    (data: unknown, context: ExecutionContext): IJwtPayload => {
      const req = context.switchToHttp().getRequest();
      return req.user as IJwtPayload;
    },
  );
