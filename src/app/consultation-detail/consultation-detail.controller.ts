import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationDetailService } from './consultation-detail.service';
import { CreateConsultationDetailDto } from './dto/create-consultation-detail.dto';
import { UpdateConsultationDetailDto } from './dto/update-consultation-detail.dto';

@Controller('consultation-detail')
export class ConsultationDetailController {
  constructor(
    private readonly consultationDetailService: ConsultationDetailService,
  ) {}

  @Post()
  create(@Body() createConsultationDetailDto: CreateConsultationDetailDto) {
    return this.consultationDetailService.create(createConsultationDetailDto);
  }

  @Get()
  findAll() {
    return this.consultationDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDetailDto: UpdateConsultationDetailDto,
  ) {
    return this.consultationDetailService.update(
      +id,
      updateConsultationDetailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationDetailService.remove(+id);
  }
}
