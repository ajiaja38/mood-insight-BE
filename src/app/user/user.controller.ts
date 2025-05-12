import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { EVersioning } from 'src/types/enum/EVersioning.enum';
import { CreateUserDto } from './dto/createUsert.dto';
import { User } from './model/user.entity';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';

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
}
