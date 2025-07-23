import { KnowledgeBaseService } from './knowledge-base.service';
import { IKBResponse } from './dto/response.dto';
import { CreateKBDto } from './dto/createKB.dto';
import { UpdateKbDto } from './dto/updateKB.dto';
export declare class KnowledgeBaseController {
    private readonly knowledgeBaseService;
    constructor(knowledgeBaseService: KnowledgeBaseService);
    protected createKnowledgeBaseHandler(createKBDto: CreateKBDto): Promise<IKBResponse[]>;
    protected getAllKnowledgeBaseHandler(): Promise<IKBResponse[]>;
    protected getDetailKnowledgeBaseHandler(id: string): Promise<IKBResponse>;
    protected updateKBByIdHandler(id: string, updateKbDto: UpdateKbDto): Promise<IKBResponse>;
    protected deleteKBByIdHandler(id: string): Promise<void>;
}
