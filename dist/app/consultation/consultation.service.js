"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const consultation_entity_1 = require("./model/consultation.entity");
const typeorm_2 = require("typeorm");
const consultation_detail_entity_1 = require("../consultation-detail/model/consultation-detail.entity");
const diagnosis_result_entity_1 = require("../diagnosis-result/model/diagnosis-result.entity");
const message_service_1 = require("../message/message.service");
const user_entity_1 = require("../user/model/user.entity");
const knowledge_base_entity_1 = require("../knowledge-base/model/knowledge-base.entity");
const createConsultation_dto_1 = require("./dto/createConsultation.dto");
const typeorm_transactional_1 = require("typeorm-transactional");
const generateID_1 = require("../../utils/generateID");
const symptom_entity_1 = require("../symptom/model/symptom.entity");
const diagnosis_result_disorder_1 = require("../diagnosis-result-disorder/model/diagnosis-result-disorder");
const uuid_1 = require("uuid");
let ConsultationService = class ConsultationService {
    constructor(consultationRepository, consultationDetailRepository, diagnosisResultRepository, diagnosisResultDisorderRepository, userRepository, knowledgeBaseRepository, symtompRepository, messageService) {
        this.consultationRepository = consultationRepository;
        this.consultationDetailRepository = consultationDetailRepository;
        this.diagnosisResultRepository = diagnosisResultRepository;
        this.diagnosisResultDisorderRepository = diagnosisResultDisorderRepository;
        this.userRepository = userRepository;
        this.knowledgeBaseRepository = knowledgeBaseRepository;
        this.symtompRepository = symtompRepository;
        this.messageService = messageService;
    }
    async createConsultation(userId, { symptomIds }) {
        const user = await this.userRepository.findOneBy({
            id: userId,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const newConsultation = await this.consultationRepository.save({
            id: `C-${(0, uuid_1.v4)()}`,
            user,
        });
        for (const symptomId of symptomIds) {
            const symptom = await this.symtompRepository.findOneBy({
                id: symptomId,
            });
            if (!symptom)
                throw new common_1.NotFoundException('Symptom not found');
            const lastDetail = await this.consultationDetailRepository.find({
                order: { id: 'DESC' },
                take: 1,
            });
            const newDetailId = (0, generateID_1.generateID)('CD', lastDetail[0]?.id ?? null);
            await this.consultationDetailRepository.save({
                id: newDetailId,
                consultation: newConsultation,
                symptom,
            });
        }
        const knowledgeBases = await this.knowledgeBaseRepository.find({
            where: { symptom: { id: (0, typeorm_2.In)(symptomIds) } },
            relations: ['disorder', 'symptom'],
        });
        const massFunction = [];
        for (const symptomId of symptomIds) {
            const symptomKnowledgeBases = knowledgeBases.filter((kb) => kb.symptom.id === symptomId);
            const rawBelief = symptomKnowledgeBases.reduce((sum, kb) => sum + kb.weight, 0);
            const belief = symptomKnowledgeBases.length === 0
                ? 0
                : parseFloat((rawBelief / symptomKnowledgeBases.length).toFixed(2));
            const uniqueDisorders = [
                ...new Set(symptomKnowledgeBases.map((kb) => kb.disorder.id)),
            ];
            if (belief > 0 && uniqueDisorders.length > 0) {
                massFunction.push({
                    disorders: uniqueDisorders,
                    belief,
                });
            }
        }
        const extendedMassFunction = massFunction.map((m) => [
            m,
            {
                disorders: ['θ'],
                belief: parseFloat((1 - m.belief).toFixed(2)),
            },
        ]);
        let combined = extendedMassFunction[0];
        for (let i = 1; i < extendedMassFunction.length; i++) {
            combined = this.dempsterShafer(combined, extendedMassFunction[i]);
        }
        combined.sort((a, b) => b.belief - a.belief);
        const mostProbableDisorders = combined[0];
        for (const combineDisorder of combined) {
            if (combineDisorder.disorders.includes('θ'))
                continue;
            const lastDiagnosisResult = await this.diagnosisResultRepository.find({
                order: { id: 'DESC' },
                take: 1,
            });
            const newDiagnosisId = (0, generateID_1.generateID)('DR', lastDiagnosisResult[0]?.id ?? null);
            const diagnosisResult = await this.diagnosisResultRepository.save({
                id: newDiagnosisId,
                consultation: newConsultation,
                belief_value: combineDisorder.belief,
            });
            if (!diagnosisResult)
                throw new common_1.BadRequestException('Diagnosis not found');
            for (const disorderId of combineDisorder.disorders) {
                const lastDiagnosisResultDisorder = await this.diagnosisResultDisorderRepository.find({
                    order: { id: 'DESC' },
                    take: 1,
                });
                const newDiagnosisDisorderId = (0, generateID_1.generateID)('DRD', lastDiagnosisResultDisorder[0]?.id ?? null);
                await this.diagnosisResultDisorderRepository.save({
                    id: newDiagnosisDisorderId,
                    diagnosisResult: {
                        id: newDiagnosisId,
                    },
                    disorder: {
                        id: disorderId,
                    },
                });
            }
        }
        this.messageService.setMessage('Consultation created successfully');
        return {
            consultationId: newConsultation.id,
            result: {
                disorders: mostProbableDisorders?.disorders ?? [],
                belief: mostProbableDisorders?.belief ?? 0,
            },
        };
    }
    dempsterShafer(m1, m2) {
        const result = {};
        let conflict = 0;
        for (const mf1 of m1) {
            for (const mf2 of m2) {
                const intersection = mf1.disorders.includes('θ')
                    ? mf2.disorders
                    : mf2.disorders.includes('θ')
                        ? mf1.disorders
                        : mf1.disorders.filter((d) => mf2.disorders.includes(d));
                if (intersection.length === 0) {
                    conflict += mf1.belief * mf2.belief;
                    continue;
                }
                const key = [...new Set(intersection)].sort().join(',');
                result[key] = (result[key] || 0) + mf1.belief * mf2.belief;
            }
        }
        if (conflict === 1) {
            return [
                {
                    disorders: ['θ'],
                    belief: 1,
                },
            ];
        }
        const normalizedResult = [];
        for (const key in result) {
            const belief = result[key] / (1 - conflict);
            const disorders = key.split(',');
            normalizedResult.push({
                disorders,
                belief: parseFloat(belief.toFixed(3)),
            });
        }
        return normalizedResult;
    }
    async findAllConsultation(userId) {
        const consultation = await this.consultationRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: [
                'user',
                'diagnosisResult',
                'diagnosisResult.diagnosisResultDisorder',
                'diagnosisResult.diagnosisResultDisorder.disorder',
            ],
            order: {
                createdAt: 'DESC',
            },
        });
        this.messageService.setMessage('Get all consultation successfully');
        const response = consultation.map((c) => {
            const highestBeliefResult = c.diagnosisResult.reduce((prev, current) => prev.belief_value > current.belief_value ? prev : current);
            const percenTage = (highestBeliefResult.belief_value * 100).toFixed(0);
            return {
                id: c.id,
                user: c.user.name,
                result: `${percenTage}% ${highestBeliefResult.diagnosisResultDisorder[0].disorder.name}`,
                createdAt: c.createdAt,
            };
        });
        return response;
    }
    async findDetailConsultation(id) {
        const consultation = await this.consultationRepository.findOne({
            where: {
                id,
            },
            relations: [
                'user',
                'consultationDetail',
                'consultationDetail.symptom',
                'diagnosisResult',
                'diagnosisResult.diagnosisResultDisorder',
                'diagnosisResult.diagnosisResultDisorder.disorder',
                'diagnosisResult.diagnosisResultDisorder.disorder.solution',
            ],
        });
        if (!consultation)
            throw new common_1.NotFoundException('Consultation not found');
        this.messageService.setMessage('Get detail consultation successfully');
        const sortedDiagnosis = [
            ...consultation.diagnosisResult,
        ].sort((a, b) => b.belief_value - a.belief_value);
        return {
            id: consultation.id,
            userId: consultation.user.id,
            user: consultation.user.name,
            userAddress: consultation.user.address,
            userEmail: consultation.user.email,
            userPhoneNumber: consultation.user.phoneNumber,
            symptoms: consultation.consultationDetail.map((cd) => ({
                symptomId: cd.symptom.id,
                symptom: cd.symptom.symptom,
            })),
            diagnosisResult: sortedDiagnosis.map((diagnosisResult) => ({
                id: diagnosisResult.id,
                belief_value: parseFloat(diagnosisResult.belief_value.toFixed(2)),
                plausability_value: 1 - diagnosisResult.belief_value,
                disorder: diagnosisResult.diagnosisResultDisorder.map((diagnosisResultDisorder) => ({
                    id: diagnosisResultDisorder.disorder.id,
                    name: diagnosisResultDisorder.disorder.name,
                })),
            })),
            solution: sortedDiagnosis[0]?.diagnosisResultDisorder[0]?.disorder.solution.map((s) => s.solution),
            createdAt: consultation.createdAt,
        };
    }
};
exports.ConsultationService = ConsultationService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createConsultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", Promise)
], ConsultationService.prototype, "createConsultation", null);
exports.ConsultationService = ConsultationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __param(1, (0, typeorm_1.InjectRepository)(consultation_detail_entity_1.ConsultationDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(diagnosis_result_entity_1.DiagnosisResult)),
    __param(3, (0, typeorm_1.InjectRepository)(diagnosis_result_disorder_1.DiagnosisResultDisorder)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(knowledge_base_entity_1.KnowledgeBase)),
    __param(6, (0, typeorm_1.InjectRepository)(symptom_entity_1.Symptom)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        message_service_1.MessageService])
], ConsultationService);
//# sourceMappingURL=consultation.service.js.map