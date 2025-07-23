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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const message_service_1 = require("../app/message/message.service");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(messageService) {
        this.messageService = messageService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((res) => {
            const statusCode = context
                .switchToHttp()
                .getResponse().statusCode;
            const response = {
                code: statusCode,
                status: true,
                message: this.messageService.getMessage() || 'Successfully retrieve data',
            };
            if (Array.isArray(res)) {
                response.data = res;
            }
            else if (res !== null &&
                typeof res === 'object' &&
                'data' in res &&
                'meta' in res) {
                const wrapped = res;
                response.data = wrapped.data;
                response.meta = wrapped.meta;
            }
            else {
                response.data = res;
            }
            return response;
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map