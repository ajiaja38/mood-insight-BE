import { DisorderService } from './disorder.service';
import { DisorderDto } from './dto/createDisorder.dto';
import { Disorder } from './model/disorder.entity';
import { IDetailDisorder } from './dto/response.dto';
export declare class DisorderController {
    private readonly disorderService;
    constructor(disorderService: DisorderService);
    protected createDisorderHandler(createDisorderDto: DisorderDto): Promise<Disorder>;
    protected findAllDisorderHandler(): Promise<Disorder[]>;
    protected findOneDisorderHandler(id: string): Promise<IDetailDisorder>;
    protected updateDisorderHandler(id: string, updateDisorderDto: DisorderDto): Promise<Disorder>;
    protected deleteDisorderHandler(id: string): Promise<void>;
}
