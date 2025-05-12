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
    const id: string = generateID('P', lastID);

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

  public async findOneDisorder(id: string): Promise<Disorder> {
    const disorder: Disorder | null = await this.disorderRepository.findOne({
      where: { id },
      select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    });

    if (!disorder) throw new NotFoundException('Disorder not found');

    return disorder;
  }

  public async updateDisorder(
    id: string,
    updateDisorderDto: DisorderDto,
  ): Promise<Disorder> {
    const disorder: Disorder = await this.findOneDisorder(id);

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
