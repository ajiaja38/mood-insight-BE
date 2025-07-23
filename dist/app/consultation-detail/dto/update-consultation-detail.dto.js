"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsultationDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_consultation_detail_dto_1 = require("./create-consultation-detail.dto");
class UpdateConsultationDetailDto extends (0, mapped_types_1.PartialType)(create_consultation_detail_dto_1.CreateConsultationDetailDto) {
}
exports.UpdateConsultationDetailDto = UpdateConsultationDetailDto;
//# sourceMappingURL=update-consultation-detail.dto.js.map