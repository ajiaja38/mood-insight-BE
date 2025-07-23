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
exports.SymptomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const symptom_entity_1 = require("./model/symptom.entity");
const typeorm_2 = require("typeorm");
const message_service_1 = require("../message/message.service");
const generateID_1 = require("../../utils/generateID");
let SymptomService = class SymptomService {
    constructor(symptomRepository, messageService) {
        this.symptomRepository = symptomRepository;
        this.messageService = messageService;
    }
    async createSymptom({ symptom }) {
        const latesData = await this.symptomRepository.find({
            take: 1,
            order: { id: 'DESC' },
        });
        const lastID = latesData[0]?.id ?? null;
        const id = (0, generateID_1.generateID)('S', lastID);
        const newSymptom = await this.symptomRepository.save({
            id,
            symptom,
        });
        if (!symptom)
            throw new Error('Failed to create symptom');
        this.messageService.setMessage('Symptom created successfully');
        return newSymptom;
    }
    async findAllSymptom() {
        this.messageService.setMessage('Get all symptom successfully');
        return this.symptomRepository.find({
            select: ['id', 'symptom'],
        });
    }
    async findOneSymptom(id) {
        const symptom = await this.symptomRepository.findOne({
            where: { id },
            select: ['id', 'symptom', 'createdAt', 'updatedAt'],
        });
        if (!symptom)
            throw new common_1.NotFoundException('Symptom not found');
        return symptom;
    }
    async updateSymptom(id, { symptom }) {
        const symptomData = await this.findOneSymptom(id);
        symptomData.symptom = symptom;
        const updatedSymptom = await this.symptomRepository.save(symptomData);
        if (!updatedSymptom)
            throw new Error('Failed to update symptom');
        this.messageService.setMessage('Symptom updated successfully ⚡️');
        return updatedSymptom;
    }
    async deleteSymptom(id) {
        const deletedSymptom = await this.symptomRepository.delete({
            id,
        });
        if (!deletedSymptom.affected)
            throw new Error('Symptom not found');
        this.messageService.setMessage('Symptom deleted successfully');
    }
};
exports.SymptomService = SymptomService;
exports.SymptomService = SymptomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(symptom_entity_1.Symptom)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        message_service_1.MessageService])
], SymptomService);
//# sourceMappingURL=symptom.service.js.map