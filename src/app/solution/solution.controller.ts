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
import { SolutionService } from './solution.service';
import { EVersioning } from '../../types/enum/EVersioning.enum';
import { CreateSolutionDto, UpdateSolutionDto } from './dto/createSolution.dto';
import { Solution } from './model/solution.entity';
import { Roles } from '../../decorator/roles.decorator';
import { ERole } from '../../types/enum/ERole.enum';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { RoleGuard } from '../../guard/role.guard';

@Controller({
  path: 'solution',
  version: EVersioning.V1,
})
@UseGuards(JwtAuthGuard, RoleGuard)
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected createSolutionHandler(
    @Body() createSolutionDto: CreateSolutionDto,
  ): Promise<Solution> {
    return this.solutionService.createSolution(createSolutionDto);
  }

  @Get()
  @Roles(ERole.ADMIN, ERole.USER)
  protected findAllSolutionHandler(): Promise<Solution[]> {
    return this.solutionService.findAllSolution();
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected findSolutionByDisorderIdHandler(
    @Param('id') id: string,
  ): Promise<Solution> {
    return this.solutionService.findSolutionById(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected updateSolutionHandler(
    @Param('id') id: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ): Promise<Solution> {
    return this.solutionService.updateSolution(id, updateSolutionDto);
  }

  @Delete(':id')
  @Roles(ERole.ADMIN)
  protected deleteSolutionHandler(@Param('id') id: string): Promise<void> {
    return this.solutionService.deleteSolution(id);
  }
}
