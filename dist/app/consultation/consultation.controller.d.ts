import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { IJwtPayload } from '../../types/interface/IJwtPayload.interface';
import { IResAllConsultation, IResDetailConsultation } from './dto/response.dto';
import { IResNewConsultation } from './interface/respomse.interface';
export declare class ConsultationController {
    private readonly consultationService;
    constructor(consultationService: ConsultationService);
    protected createConsultation(user: IJwtPayload, createConsultationDto: CreateConsultationDto): Promise<IResNewConsultation>;
    protected getAllConsultationHandler(): Promise<IResAllConsultation[]>;
    protected getAllUserConsultationHandler(user: IJwtPayload): Promise<IResAllConsultation[]>;
    protected getDetailConsultationHandler(id: string): Promise<IResDetailConsultation>;
}
