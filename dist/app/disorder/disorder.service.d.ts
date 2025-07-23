import { MessageService } from '../message/message.service';
import { Disorder } from './model/disorder.entity';
import { Repository } from 'typeorm';
import { DisorderDto } from './dto/createDisorder.dto';
import { IDetailDisorder } from './dto/response.dto';
export declare class DisorderService {
    private readonly disorderRepository;
    private readonly messageService;
    constructor(disorderRepository: Repository<Disorder>, messageService: MessageService);
    createDisorder({ name, description, }: DisorderDto): Promise<Disorder>;
    findAllDisorder(): Promise<Disorder[]>;
    findOneDisorder(id: string): Promise<IDetailDisorder>;
    updateDisorder(id: string, updateDisorderDto: DisorderDto): Promise<Disorder>;
    deleteDisorder(id: string): Promise<void>;
}
