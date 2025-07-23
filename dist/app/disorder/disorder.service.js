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
exports.DisorderService = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("../message/message.service");
const typeorm_1 = require("@nestjs/typeorm");
const disorder_entity_1 = require("./model/disorder.entity");
const typeorm_2 = require("typeorm");
const generateID_1 = require("../../utils/generateID");
let DisorderService = class DisorderService {
    constructor(disorderRepository, messageService) {
        this.disorderRepository = disorderRepository;
        this.messageService = messageService;
    }
    async createDisorder({ name, description, }) {
        const lastData = await this.disorderRepository.find({
            take: 1,
            order: { id: 'DESC' },
        });
        const lastID = lastData[0]?.id ?? null;
        const id = (0, generateID_1.generateID)('D', lastID);
        const disorder = await this.disorderRepository.save({
            id,
            name,
            description,
        });
        if (!disorder)
            throw new common_1.BadRequestException('Failed to create disorder');
        this.messageService.setMessage('Disorder has created successfully');
        return disorder;
    }
    async findAllDisorder() {
        this.messageService.setMessage('Get all disorder successfully');
        return this.disorderRepository.find({
            select: ['id', 'name', 'description'],
            order: { createdAt: 'ASC' },
        });
    }
    async findOneDisorder(id) {
        const disorder = await this.disorderRepository.findOne({
            where: { id },
            relations: ['solution'],
        });
        if (!disorder)
            throw new common_1.NotFoundException('Disorder not found');
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
    async updateDisorder(id, updateDisorderDto) {
        const disorder = await this.findOneDisorder(id);
        disorder.name = updateDisorderDto.name;
        disorder.description = updateDisorderDto.description;
        const updatedDisorder = await this.disorderRepository.save(disorder);
        if (!updatedDisorder)
            throw new common_1.BadRequestException('Failed to update disorder');
        this.messageService.setMessage('Disorder updated successfully');
        return updatedDisorder;
    }
    async deleteDisorder(id) {
        const deletedDisorder = await this.disorderRepository.delete({
            id,
        });
        if (!deletedDisorder.affected)
            throw new common_1.BadRequestException('Disorder not found');
        this.messageService.setMessage('Disorder deleted successfully');
    }
};
exports.DisorderService = DisorderService;
exports.DisorderService = DisorderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(disorder_entity_1.Disorder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        message_service_1.MessageService])
], DisorderService);
//# sourceMappingURL=disorder.service.js.map