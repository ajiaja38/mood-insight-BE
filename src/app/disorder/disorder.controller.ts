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
import { DisorderService } from './disorder.service';
import { EVersioning } from 'src/types/enum/EVersioning.enum';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';
import { DisorderDto } from './dto/createDisorder.dto';
import { Disorder } from './model/disorder.entity';

@Controller({
  path: 'disorder',
  version: EVersioning.V1,
})
@UseGuards(JwtAuthGuard, RoleGuard)
export class DisorderController {
  constructor(private readonly disorderService: DisorderService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected createDisorderHandler(
    @Body() createDisorderDto: DisorderDto,
  ): Promise<Disorder> {
    return this.disorderService.createDisorder(createDisorderDto);
  }

  @Get()
  @Roles(ERole.ADMIN, ERole.USER)
  protected findAllDisorderHandler(): Promise<Disorder[]> {
    return this.disorderService.findAllDisorder();
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected findOneDisorderHandler(@Param('id') id: string): Promise<Disorder> {
    return this.disorderService.findOneDisorder(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected updateDisorderHandler(
    @Param('id') id: string,
    @Body() updateDisorderDto: DisorderDto,
  ): Promise<Disorder> {
    return this.disorderService.updateDisorder(id, updateDisorderDto);
  }

  @Delete(':id')
  @Roles(ERole.ADMIN)
  protected deleteDisorderHandler(@Param('id') id: string): Promise<void> {
    return this.disorderService.deleteDisorder(id);
  }
}
