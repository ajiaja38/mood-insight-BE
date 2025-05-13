import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDetailDto } from './create-consultation-detail.dto';

export class UpdateConsultationDetailDto extends PartialType(
  CreateConsultationDetailDto,
) {}
