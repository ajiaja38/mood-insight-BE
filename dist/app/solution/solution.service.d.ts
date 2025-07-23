import { Solution } from './model/solution.entity';
import { Repository } from 'typeorm';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageService } from '../message/message.service';
import { CreateSolutionDto, UpdateSolutionDto } from './dto/createSolution.dto';
export declare class SolutionService {
    private readonly solutionRepository;
    private readonly disorderRepository;
    private readonly messageService;
    constructor(solutionRepository: Repository<Solution>, disorderRepository: Repository<Disorder>, messageService: MessageService);
    createSolution(createSolutionDto: CreateSolutionDto): Promise<Solution>;
    findAllSolution(): Promise<Solution[]>;
    findSolutionById(id: string): Promise<Solution>;
    updateSolution(id: string, { solution }: UpdateSolutionDto): Promise<Solution>;
    deleteSolution(id: string): Promise<void>;
}
