import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { EVersioning } from 'src/types/enum/EVersioning.enum';
import { IKBResponse } from './dto/response.dto';
import { CreateKBDto } from './dto/createKB.dto';
import { ERole } from 'src/types/enum/ERole.enum';
import { Roles } from 'src/decorator/roles.decorator';

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
}
