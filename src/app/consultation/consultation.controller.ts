import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { Consultation } from './model/consultation.entity';
import { User } from 'src/decorator/user.decorator';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';
import { EVersioning } from 'src/types/enum/EVersioning.enum';

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
  ): Promise<Consultation> {
    return this.consultationService.createConsultation(
      user.id,
      createConsultationDto,
    );
  }
}
