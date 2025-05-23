jest.mock('typeorm-transactional', () => ({
  initializeTransactionalContext: jest.fn(),
  addTransactionalDataSource: jest.fn(),
  Transactional: () => () => {},
}));

const repoFunction = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
};

import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationService } from './consultation.service';
import { Repository } from 'typeorm';
import { Consultation } from './model/consultation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IResNewConsultation } from './interface/respomse.interface';
import { ConsultationDetail } from '../consultation-detail/model/consultation-detail.entity';
import { KnowledgeBase } from '../knowledge-base/model/knowledge-base.entity';
import { DiagnosisResult } from '../diagnosis-result/model/diagnosis-result.entity';
import { DiagnosisResultDisorder } from '../diagnosis-result-disorder/model/diagnosis-result-disorder';
import { Symptom } from '../symptom/model/symptom.entity';
import { User } from '../user/model/user.entity';
import { MessageService } from '../message/message.service';

describe('ConsultationService', () => {
  let service: ConsultationService;
  let mockupConsultationRepository: Partial<
    Record<keyof Repository<Consultation>, jest.Mock>
  >;
  let mockupSymptomRepository: Partial<
    Record<keyof Repository<Symptom>, jest.Mock>
  >;
  let mockupConsultationDetailRepository: Partial<
    Record<keyof Repository<ConsultationDetail>, jest.Mock>
  >;
  let mockupKnowLedgeBaseRepository: Partial<
    Record<keyof Repository<KnowledgeBase>, jest.Mock>
  >;
  let mockupDiagnosisResultRepository: Partial<
    Record<keyof Repository<DiagnosisResult>, jest.Mock>
  >;
  let mockupDiagnosisResultDisorderRepository: Partial<
    Record<keyof Repository<DiagnosisResultDisorder>, jest.Mock>
  >;

  beforeEach(async () => {
    mockupConsultationRepository = repoFunction;
    mockupSymptomRepository = mockupSymptomRepository = {
      ...repoFunction,
      findOneBy: jest.fn().mockImplementation(({ id }) => {
        return Promise.resolve({ id });
      }),
    };
    mockupConsultationDetailRepository = repoFunction;
    mockupKnowLedgeBaseRepository = repoFunction;
    mockupDiagnosisResultRepository = repoFunction;
    mockupDiagnosisResultDisorderRepository = repoFunction;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultationService,
        {
          provide: getRepositoryToken(Consultation),
          useValue: mockupConsultationRepository,
        },
        {
          provide: getRepositoryToken(ConsultationDetail),
          useValue: mockupConsultationDetailRepository,
        },
        {
          provide: getRepositoryToken(KnowledgeBase),
          useValue: mockupKnowLedgeBaseRepository,
        },
        {
          provide: getRepositoryToken(DiagnosisResult),
          useValue: mockupDiagnosisResultRepository,
        },
        {
          provide: getRepositoryToken(DiagnosisResultDisorder),
          useValue: mockupDiagnosisResultDisorderRepository,
        },
        {
          provide: getRepositoryToken(Symptom),
          useValue: mockupSymptomRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue({ id: 'U001' }),
          },
        },
        {
          provide: MessageService,
          useValue: {
            setMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConsultationService>(ConsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a consultation', async () => {
    const userId = 'U001';
    const dto = { symptomIds: ['S001', 'S005', 'S006'] };

    const savedConsultationEntity = { id: 'C001', user: { id: userId } };
    const expectedResult: IResNewConsultation = {
      consultationId: 'C001',
      result: { belief: 0.992, disorders: ['D002'] },
    };

    mockupConsultationRepository.save!.mockResolvedValue(
      savedConsultationEntity,
    );

    mockupSymptomRepository.findOneBy!.mockImplementation(({ id }) =>
      Promise.resolve({ id }),
    );

    mockupConsultationDetailRepository.save!.mockImplementation((detail) =>
      Promise.resolve(detail),
    );

    mockupDiagnosisResultRepository.find!.mockResolvedValue([]);
    mockupDiagnosisResultDisorderRepository.find!.mockResolvedValue([]);

    mockupKnowLedgeBaseRepository.find!.mockResolvedValue([
      {
        symptom: { id: 'S001' },
        disorder: { id: 'D002' },
        weight: 0.8,
      },
      {
        symptom: { id: 'S005' },
        disorder: { id: 'D002' },
        weight: 0.8,
      },
      {
        symptom: { id: 'S006' },
        disorder: { id: 'D002' },
        weight: 0.8,
      },
    ]);

    const result = await service.createConsultation(userId, dto);

    expect(mockupConsultationRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'C001',
        user: expect.objectContaining({ id: userId }),
      }),
    );

    expect(result.consultationId).toEqual(expectedResult.consultationId);
    expect(result.result.disorders).toEqual(expectedResult.result.disorders);
    expect(result.result.belief).toBeCloseTo(expectedResult.result.belief, 2);
  });
});
