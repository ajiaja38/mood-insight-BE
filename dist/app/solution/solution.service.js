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
exports.SolutionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const solution_entity_1 = require("./model/solution.entity");
const typeorm_2 = require("typeorm");
const disorder_entity_1 = require("../disorder/model/disorder.entity");
const message_service_1 = require("../message/message.service");
const generateID_1 = require("../../utils/generateID");
let SolutionService = class SolutionService {
    constructor(solutionRepository, disorderRepository, messageService) {
        this.solutionRepository = solutionRepository;
        this.disorderRepository = disorderRepository;
        this.messageService = messageService;
    }
    async createSolution(createSolutionDto) {
        const lastData = await this.solutionRepository.find({
            take: 1,
            order: { id: 'DESC' },
        });
        const lastID = lastData[0]?.id ?? null;
        const id = (0, generateID_1.generateID)('SL', lastID);
        const disorder = await this.disorderRepository.findOneBy({
            id: createSolutionDto.disorderId,
        });
        if (!disorder)
            throw new common_1.NotFoundException('Disorder not found');
        const solution = await this.solutionRepository.save({
            id,
            solution: createSolutionDto.solution,
            disorder,
        });
        if (!solution)
            throw new common_1.BadRequestException('Failed to create solution');
        this.messageService.setMessage('Solution created successfully');
        return solution;
    }
    async findAllSolution() {
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
    async findSolutionById(id) {
        const solution = await this.solutionRepository
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
        if (!solution.length)
            throw new common_1.NotFoundException('Solution not found');
        this.messageService.setMessage('Get solution by disorder id successfully');
        return solution[0];
    }
    async updateSolution(id, { solution }) {
        const solutionToUpdate = await this.solutionRepository.findOneBy({ id });
        if (!solutionToUpdate)
            throw new common_1.NotFoundException('Solution not found');
        solutionToUpdate.solution = solution;
        const updatedSolution = await this.solutionRepository.save(solutionToUpdate);
        if (!updatedSolution)
            throw new common_1.BadRequestException('Failed to update solution');
        this.messageService.setMessage('Solution updated successfully');
        return updatedSolution;
    }
    async deleteSolution(id) {
        const deletedSolution = await this.solutionRepository.delete({
            id,
        });
        if (!deletedSolution.affected)
            throw new common_1.BadRequestException('Solution not found');
        this.messageService.setMessage('Solution deleted successfully');
    }
};
exports.SolutionService = SolutionService;
exports.SolutionService = SolutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solution_entity_1.Solution)),
    __param(1, (0, typeorm_1.InjectRepository)(disorder_entity_1.Disorder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        message_service_1.MessageService])
], SolutionService);
//# sourceMappingURL=solution.service.js.map