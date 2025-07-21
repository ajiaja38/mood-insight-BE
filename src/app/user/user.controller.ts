import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EVersioning } from '../../types/enum/EVersioning.enum';
import { CreateUserDto } from './dto/createUsert.dto';
import { User } from './model/user.entity';
import { User as UserDecorator } from '../../decorator/user.decorator';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { RoleGuard } from '../../guard/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { ERole } from '../../types/enum/ERole.enum';
import { IJwtPayload } from '../../types/interface/IJwtPayload.interface';
import { UpdateUserDto } from './dto/updateUsert.dto';

@Controller({
  version: EVersioning.V1,
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  protected registerUserHandler(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('admin')
  protected registerAdminHandler(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto, true);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  protected getAllUserHandler(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  protected getUserByIDHandler(@Param('id') id: string): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @Get('data/profile')
  @UseGuards(JwtAuthGuard)
  protected getUserProfileHandler(
    @UserDecorator() user: IJwtPayload,
  ): Promise<User> {
    return this.userService.findOneUser(user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  protected updateUserHandler(
    @UserDecorator() user: IJwtPayload,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  protected deleteUserHandler(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
