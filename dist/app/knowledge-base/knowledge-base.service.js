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
exports.KnowledgeBaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knowledge_base_entity_1 = require("./model/knowledge-base.entity");
const typeorm_2 = require("typeorm");
const symptom_entity_1 = require("../symptom/model/symptom.entity");
const disorder_entity_1 = require("../disorder/model/disorder.entity");
const message_service_1 = require("../message/message.service");
const createKB_dto_1 = require("./dto/createKB.dto");
const typeorm_transactional_1 = require("typeorm-transactional");
const generateID_1 = require("../../utils/generateID");
let KnowledgeBaseService = class KnowledgeBaseService {
    constructor(knowledgeBaseRepository, symptomRepository, disorderRepository, messageService) {
        this.knowledgeBaseRepository = knowledgeBaseRepository;
        this.symptomRepository = symptomRepository;
        this.disorderRepository = disorderRepository;
        this.messageService = messageService;
    }
    async createKnowledgeBase({ details, }) {
        const knowledgeBases = [];
        for (const kb of details) {
            const [symptom, disorder] = await Promise.all([
                this.symptomRepository.findOneBy({ id: kb.symptomId }),
                this.disorderRepository.findOneBy({ id: kb.disorderId }),
            ]);
            if (!symptom)
                throw new common_1.NotFoundException('Symptom not found');
            if (!disorder)
                throw new common_1.NotFoundException('Disorder not found');
            const lastData = await this.knowledgeBaseRepository.find({
                take: 1,
                order: { id: 'DESC' },
            });
            const lastID = lastData[0]?.id ?? null;
            const id = (0, generateID_1.generateID)('KB', lastID);
            const newKB = this.knowledgeBaseRepository.create({
                id,
                symptom,
                disorder,
                weight: kb.weight,
            });
            knowledgeBases.push(newKB);
        }
        const result = await this.knowledgeBaseRepository.save(knowledgeBases);
        if (!result)
            throw new common_1.BadRequestException('Failed to create knowledge base');
        this.messageService.setMessage('Knowledge base created successfully');
        return this.responseBuilder(result);
    }
    async getAllKnowledgeBase() {
        const knowledgeBases = await this.knowledgeBaseRepository.find({
            relations: ['symptom', 'disorder'],
            order: { createdAt: 'ASC' },
        });
        this.messageService.setMessage('Get Knowledgebase successfully');
        return this.responseBuilder(knowledgeBases);
    }
    async getDetailKnowledgeBase(id) {
        const knowledgeBases = await this.knowledgeBaseRepository.query(`
        SELECT
          kb.id as id,
          s.id as symptomId,
          s.symptom as symptom,
          d.id as disorderId,
          d.name as disorder,
          kb.weight as weight,
          kb.created_at as createdAt,
          kb.updated_at as updatedAt
        FROM knowledge_base as kb
        LEFT JOIN symptom as s ON kb.symptom_id = s.id
        LEFT JOIN disorder as d ON kb.disorder_id = d.id
        WHERE kb.id = '${id}';
        `);
        if (!knowledgeBases.length)
            throw new common_1.NotFoundException('Knowledge base is not found');
        this.messageService.setMessage('Get knowledge base by id successfully');
        return knowledgeBases[0];
    }
    async updateKBById(id, { weight }) {
        const updatedKB = await this.knowledgeBaseRepository.findOne({
            where: { id },
            relations: ['symptom', 'disorder'],
        });
        if (!updatedKB)
            throw new common_1.NotFoundException('KB not found');
        updatedKB.weight = weight;
        const result = await this.knowledgeBaseRepository.save(updatedKB);
        if (!result)
            throw new common_1.BadRequestException('Failed to update KB');
        this.messageService.setMessage('Knowledge base updated successfully');
        return {
            id: result.id,
            symptomId: result.symptom.id,
            symptom: result.symptom.symptom,
            disorderId: result.disorder.id,
            disorder: result.disorder.name,
            weight: result.weight,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };
    }
    async deleteKBById(id) {
        const deletedKB = await this.knowledgeBaseRepository.delete({
            id,
        });
        if (!deletedKB.affected)
            throw new common_1.BadRequestException('KB not found');
        this.messageService.setMessage('Knowledge base deleted successfully');
    }
    responseBuilder(knowledgeBases) {
        return knowledgeBases.map((kb) => ({
            id: kb.id,
            symptomId: kb.symptom.id,
            symptom: kb.symptom.symptom,
            disorderId: kb.disorder.id,
            disorder: kb.disorder.name,
            weight: kb.weight,
            createdAt: kb.createdAt,
            updatedAt: kb.updatedAt,
        }));
    }
};
exports.KnowledgeBaseService = KnowledgeBaseService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createKB_dto_1.CreateKBDto]),
    __metadata("design:returntype", Promise)
], KnowledgeBaseService.prototype, "createKnowledgeBase", null);
exports.KnowledgeBaseService = KnowledgeBaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(knowledge_base_entity_1.KnowledgeBase)),
    __param(1, (0, typeorm_1.InjectRepository)(symptom_entity_1.Symptom)),
    __param(2, (0, typeorm_1.InjectRepository)(disorder_entity_1.Disorder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        message_service_1.MessageService])
], KnowledgeBaseService);
//# sourceMappingURL=knowledge-base.service.js.map