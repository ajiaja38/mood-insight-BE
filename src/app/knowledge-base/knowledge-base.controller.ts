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
import { KnowledgeBaseService } from './knowledge-base.service';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { RoleGuard } from '../../guard/role.guard';
import { EVersioning } from '../../types/enum/EVersioning.enum';
import { IKBResponse } from './dto/response.dto';
import { CreateKBDto } from './dto/createKB.dto';
import { ERole } from '../../types/enum/ERole.enum';
import { Roles } from '../../decorator/roles.decorator';
import { UpdateKbDto } from './dto/updateKB.dto';

@Controller({
  path: 'knowledge-base',
  version: EVersioning.V1,
})
@UseGuards(JwtAuthGuard, RoleGuard)
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected createKnowledgeBaseHandler(
    @Body() createKBDto: CreateKBDto,
  ): Promise<IKBResponse[]> {
    return this.knowledgeBaseService.createKnowledgeBase(createKBDto);
  }

  @Get()
  @Roles(ERole.ADMIN, ERole.USER)
  protected getAllKnowledgeBaseHandler(): Promise<IKBResponse[]> {
    return this.knowledgeBaseService.getAllKnowledgeBase();
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected getDetailKnowledgeBaseHandler(
    @Param('id') id: string,
  ): Promise<IKBResponse> {
    return this.knowledgeBaseService.getDetailKnowledgeBase(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected updateKBByIdHandler(
    @Param('id') id: string,
    @Body() updateKbDto: UpdateKbDto,
  ): Promise<IKBResponse> {
    return this.knowledgeBaseService.updateKBById(id, updateKbDto);
  }

  @Delete(':id')
  @Roles(ERole.ADMIN)
  protected deleteKBByIdHandler(@Param('id') id: string): Promise<void> {
    return this.knowledgeBaseService.deleteKBById(id);
  }
}
