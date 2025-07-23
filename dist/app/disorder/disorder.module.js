"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisorderModule = void 0;
const common_1 = require("@nestjs/common");
const disorder_service_1 = require("./disorder.service");
const disorder_controller_1 = require("./disorder.controller");
const typeorm_1 = require("@nestjs/typeorm");
const disorder_entity_1 = require("./model/disorder.entity");
const message_module_1 = require("../message/message.module");
let DisorderModule = class DisorderModule {
};
exports.DisorderModule = DisorderModule;
exports.DisorderModule = DisorderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([disorder_entity_1.Disorder]), message_module_1.MessageModule],
        controllers: [disorder_controller_1.DisorderController],
        providers: [disorder_service_1.DisorderService],
    })
], DisorderModule);
//# sourceMappingURL=disorder.module.js.map