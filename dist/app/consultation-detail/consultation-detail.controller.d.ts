import { ConsultationDetailService } from './consultation-detail.service';
import { CreateConsultationDetailDto } from './dto/create-consultation-detail.dto';
import { UpdateConsultationDetailDto } from './dto/update-consultation-detail.dto';
export declare class ConsultationDetailController {
    private readonly consultationDetailService;
    constructor(consultationDetailService: ConsultationDetailService);
    create(createConsultationDetailDto: CreateConsultationDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateConsultationDetailDto: UpdateConsultationDetailDto): string;
    remove(id: string): string;
}
