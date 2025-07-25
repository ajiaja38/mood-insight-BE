import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { RoleGuard } from '../../guard/role.guard';
import { Roles } from '../../decorator/roles.decorator';
import { ERole } from '../../types/enum/ERole.enum';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { User } from '../../decorator/user.decorator';
import { IJwtPayload } from '../../types/interface/IJwtPayload.interface';
import { EVersioning } from '../../types/enum/EVersioning.enum';
import {
  IResAllConsultation,
  IResDetailConsultation,
} from './dto/response.dto';
import { IResNewConsultation } from './interface/respomse.interface';

@Controller({
  path: 'consultation',
  version: EVersioning.V1,
})
@UseGuards(JwtAuthGuard, RoleGuard)
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  @Roles(ERole.ADMIN, ERole.USER)
  protected createConsultation(
    @User() user: IJwtPayload,
    @Body() createConsultationDto: CreateConsultationDto,
  ): Promise<IResNewConsultation> {
    return this.consultationService.createConsultation(
      user.id,
      createConsultationDto,
    );
  }

  @Get()
  @Roles(ERole.ADMIN)
  protected getAllConsultationHandler(): Promise<IResAllConsultation[]> {
    return this.consultationService.findAllConsultation();
  }

  @Get('/user')
  @Roles(ERole.ADMIN, ERole.USER)
  protected getAllUserConsultationHandler(
    @User() user: IJwtPayload,
  ): Promise<IResAllConsultation[]> {
    return this.consultationService.findAllConsultation(user.id);
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected getDetailConsultationHandler(
    @Param('id') id: string,
  ): Promise<IResDetailConsultation> {
    return this.consultationService.findDetailConsultation(id);
  }
}
