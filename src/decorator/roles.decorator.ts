import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ERole } from '../types/enum/ERole.enum';

export const Roles: (...roles: ERole[]) => CustomDecorator<string> = (
  ...roles: ERole[]
) => SetMetadata('roles', roles);
