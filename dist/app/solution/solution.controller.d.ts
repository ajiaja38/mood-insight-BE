import { SolutionService } from './solution.service';
import { CreateSolutionDto, UpdateSolutionDto } from './dto/createSolution.dto';
import { Solution } from './model/solution.entity';
export declare class SolutionController {
    private readonly solutionService;
    constructor(solutionService: SolutionService);
    protected createSolutionHandler(createSolutionDto: CreateSolutionDto): Promise<Solution>;
    protected findAllSolutionHandler(): Promise<Solution[]>;
    protected findSolutionByDisorderIdHandler(id: string): Promise<Solution>;
    protected updateSolutionHandler(id: string, updateSolutionDto: UpdateSolutionDto): Promise<Solution>;
    protected deleteSolutionHandler(id: string): Promise<void>;
}
