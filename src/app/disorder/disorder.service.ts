import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Disorder } from './model/disorder.entity';
import { DeleteResult, Repository } from 'typeorm';
import { DisorderDto } from './dto/createDisorder.dto';
import { generateID } from 'src/utils/generateID';
import { IDetailDisorder } from './dto/response.dto';

@Injectable()
export class DisorderService {
  constructor(
    @InjectRepository(Disorder)
    private readonly disorderRepository: Repository<Disorder>,
    private readonly messageService: MessageService,
  ) {}

  public async createDisorder({
    name,
    description,
  }: DisorderDto): Promise<Disorder> {
    const lastData: Disorder[] = await this.disorderRepository.find({
      take: 1,
      order: { id: 'DESC' },
    });

    const lastID: string | null = lastData[0]?.id ?? null;
    const id: string = generateID('D', lastID);

    const disorder: Disorder = await this.disorderRepository.save({
      id,
      name,
      description,
    });

    if (!disorder) throw new BadRequestException('Failed to create disorder');

    this.messageService.setMessage('Disorder created successfully');
    return disorder;
  }

  public async findAllDisorder(): Promise<Disorder[]> {
    this.messageService.setMessage('Get all disorder successfully');
    return this.disorderRepository.find({
      select: ['id', 'name', 'description'],
    });
  }

  public async findOneDisorder(id: string): Promise<IDetailDisorder> {
    const disorder: Disorder | null = await this.disorderRepository.findOne({
      where: { id },
      relations: ['solution'],
    });

    if (!disorder) throw new NotFoundException('Disorder not found');

    this.messageService.setMessage('Get disorder successfully');
    return {
      id: disorder.id,
      name: disorder.name,
      description: disorder.description,
      createdAt: disorder.createdAt,
      updatedAt: disorder.updatedAt,
      solutions: disorder.solution.map((solution) => ({
        id: solution.id,
        solution: solution.solution,
      })),
    };
  }

  public async updateDisorder(
    id: string,
    updateDisorderDto: DisorderDto,
  ): Promise<Disorder> {
    const disorder: IDetailDisorder = await this.findOneDisorder(id);

    disorder.name = updateDisorderDto.name;
    disorder.description = updateDisorderDto.description;

    const updatedDisorder: Disorder =
      await this.disorderRepository.save(disorder);

    if (!updatedDisorder)
      throw new BadRequestException('Failed to update disorder');

    this.messageService.setMessage('Disorder updated successfully');
    return updatedDisorder;
  }

  public async deleteDisorder(id: string): Promise<void> {
    const deletedDisorder: DeleteResult = await this.disorderRepository.delete({
      id,
    });

    if (!deletedDisorder.affected)
      throw new BadRequestException('Disorder not found');

    this.messageService.setMessage('Disorder deleted successfully');
  }
}
