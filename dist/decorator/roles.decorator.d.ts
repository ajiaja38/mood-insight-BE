import { CustomDecorator } from '@nestjs/common';
import { ERole } from '../types/enum/ERole.enum';
export declare const Roles: (...roles: ERole[]) => CustomDecorator<string>;
