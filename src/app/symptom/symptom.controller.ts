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
import { SymptomService } from './symptom.service';
import { EVersioning } from 'src/types/enum/EVersioning.enum';
import { Symptom } from './model/symptom.entity';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';
import { SymptomDto } from './dto/symtom.dto';

@Controller({
  path: 'symptom',
  version: EVersioning.V1,
})
@UseGuards(JwtAuthGuard, RoleGuard)
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected createSymptomHandler(
    @Body() createSymptomDto: SymptomDto,
  ): Promise<Symptom> {
    return this.symptomService.createSymptom(createSymptomDto);
  }

  @Get()
  @Roles(ERole.ADMIN, ERole.USER)
  protected findAllSymptomHandler(): Promise<Symptom[]> {
    return this.symptomService.findAllSymptom();
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected findOneSymptomHandler(@Param('id') id: string): Promise<Symptom> {
    return this.symptomService.findOneSymptom(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected updateSymptomHandler(
    @Param('id') id: string,
    @Body() updateSymptomDto: SymptomDto,
  ): Promise<Symptom> {
    return this.symptomService.updateSymptom(id, updateSymptomDto);
  }

  @Delete(':id')
  @Roles(ERole.ADMIN)
  protected deleteSymptomHandler(@Param('id') id: string): Promise<void> {
    return this.symptomService.deleteSymptom(id);
  }
}
