import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Symptom } from './model/symptom.entity';
import { DeleteResult, Repository } from 'typeorm';
import { MessageService } from '../message/message.service';
import { SymptomDto } from './dto/symtom.dto';
import { generateID } from '../../utils/generateID';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom)
    private readonly symptomRepository: Repository<Symptom>,

    private readonly messageService: MessageService,
  ) {}

  public async createSymptom({ symptom }: SymptomDto): Promise<Symptom> {
    const latesData: Symptom[] = await this.symptomRepository.find({
      take: 1,
      order: { id: 'DESC' },
    });

    const lastID: string | null = latesData[0]?.id ?? null;
    const id: string = generateID('S', lastID);

    const newSymptom: Symptom = await this.symptomRepository.save({
      id,
      symptom,
    });

    if (!symptom) throw new Error('Failed to create symptom');

    this.messageService.setMessage('Symptom created successfully');
    return newSymptom;
  }

  public async findAllSymptom(): Promise<Symptom[]> {
    this.messageService.setMessage('Get all symptom successfully');
    return this.symptomRepository.find({
      select: ['id', 'symptom'],
    });
  }

  public async findOneSymptom(id: string): Promise<Symptom> {
    const symptom: Symptom | null = await this.symptomRepository.findOne({
      where: { id },
      select: ['id', 'symptom', 'createdAt', 'updatedAt'],
    });

    if (!symptom) throw new NotFoundException('Symptom not found');

    return symptom;
  }

  public async updateSymptom(id: string, { symptom }: SymptomDto) {
    const symptomData: Symptom = await this.findOneSymptom(id);

    symptomData.symptom = symptom;

    const updatedSymptom: Symptom =
      await this.symptomRepository.save(symptomData);

    if (!updatedSymptom) throw new Error('Failed to update symptom');

    this.messageService.setMessage('Symptom updated successfully ⚡️');
    return updatedSymptom;
  }

  public async deleteSymptom(id: string): Promise<void> {
    const deletedSymptom: DeleteResult = await this.symptomRepository.delete({
      id,
    });

    if (!deletedSymptom.affected) throw new Error('Symptom not found');

    this.messageService.setMessage('Symptom deleted successfully');
  }
}
