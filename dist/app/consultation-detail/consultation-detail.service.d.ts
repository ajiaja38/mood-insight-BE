import { CreateConsultationDetailDto } from './dto/create-consultation-detail.dto';
import { UpdateConsultationDetailDto } from './dto/update-consultation-detail.dto';
export declare class ConsultationDetailService {
    create(createConsultationDetailDto: CreateConsultationDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateConsultationDetailDto: UpdateConsultationDetailDto): string;
    remove(id: number): string;
}
