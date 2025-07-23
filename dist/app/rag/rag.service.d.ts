import { ConfigService } from '@nestjs/config';
export declare class RagService {
    private readonly configService;
    private llm;
    constructor(configService: ConfigService);
    getRespnseTest(): Promise<void>;
}
