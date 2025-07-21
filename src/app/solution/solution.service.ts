import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from './model/solution.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Disorder } from '../disorder/model/disorder.entity';
import { MessageService } from '../message/message.service';
import { CreateSolutionDto, UpdateSolutionDto } from './dto/createSolution.dto';
import { generateID } from '../../utils/generateID';

@Injectable()
export class SolutionService {
  constructor(
    @InjectRepository(Solution)
    private readonly solutionRepository: Repository<Solution>,

    @InjectRepository(Disorder)
    private readonly disorderRepository: Repository<Disorder>,

    private readonly messageService: MessageService,
  ) {}

  public async createSolution(
    createSolutionDto: CreateSolutionDto,
  ): Promise<Solution> {
    const lastData: Solution[] = await this.solutionRepository.find({
      take: 1,
      order: { id: 'DESC' },
    });

    const lastID: string | null = lastData[0]?.id ?? null;
    const id: string = generateID('SL', lastID);

    const disorder: Disorder | null = await this.disorderRepository.findOneBy({
      id: createSolutionDto.disorderId,
    });

    if (!disorder) throw new NotFoundException('Disorder not found');

    const solution: Solution = await this.solutionRepository.save({
      id,
      solution: createSolutionDto.solution,
      disorder,
    });

    if (!solution) throw new BadRequestException('Failed to create solution');

    this.messageService.setMessage('Solution created successfully');
    return solution;
  }

  public async findAllSolution(): Promise<Solution[]> {
    this.messageService.setMessage('Get all solution successfully');
    return this.solutionRepository
      .createQueryBuilder('solution')
      .leftJoinAndSelect('solution.disorder', 'disorder')
      .orderBy('disorder.id', 'ASC')
      .select([
        'solution.id',
        'solution.solution',
        'disorder.id',
        'disorder.name',
      ])
      .getMany();
  }

  public async findSolutionById(id: string): Promise<Solution> {
    const solution: Solution[] = await this.solutionRepository
      .createQueryBuilder('solution')
      .leftJoinAndSelect('solution.disorder', 'disorder')
      .where('solution.id = :id', { id })
      .select([
        'solution.id',
        'solution.solution',
        'solution.createdAt',
        'solution.updatedAt',
        'disorder.id',
        'disorder.name',
      ])
      .getMany();

    if (!solution.length) throw new NotFoundException('Solution not found');

    this.messageService.setMessage('Get solution by disorder id successfully');
    return solution[0];
  }

  public async updateSolution(
    id: string,
    { solution }: UpdateSolutionDto,
  ): Promise<Solution> {
    const solutionToUpdate: Solution | null =
      await this.solutionRepository.findOneBy({ id });

    if (!solutionToUpdate) throw new NotFoundException('Solution not found');

    solutionToUpdate.solution = solution;

    const updatedSolution: Solution =
      await this.solutionRepository.save(solutionToUpdate);

    if (!updatedSolution)
      throw new BadRequestException('Failed to update solution');

    this.messageService.setMessage('Solution updated successfully');
    return updatedSolution;
  }

  public async deleteSolution(id: string): Promise<void> {
    const deletedSolution: DeleteResult = await this.solutionRepository.delete({
      id,
    });

    if (!deletedSolution.affected)
      throw new BadRequestException('Solution not found');

    this.messageService.setMessage('Solution deleted successfully');
  }
}
