import { Injectable } from '@nestjs/common';
import { CreateConsultationDetailDto } from './dto/create-consultation-detail.dto';
import { UpdateConsultationDetailDto } from './dto/update-consultation-detail.dto';

@Injectable()
export class ConsultationDetailService {
  create(createConsultationDetailDto: CreateConsultationDetailDto) {
    return 'This action adds a new consultationDetail';
  }

  findAll() {
    return `This action returns all consultationDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultationDetail`;
  }

  update(id: number, updateConsultationDetailDto: UpdateConsultationDetailDto) {
    return `This action updates a #${id} consultationDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultationDetail`;
  }
}
