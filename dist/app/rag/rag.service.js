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
exports.RagService = void 0;
const groq_1 = require("@langchain/groq");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_config_1 = require("../../config/database.config");
const sql_1 = require("langchain/agents/toolkits/sql");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
let RagService = class RagService {
    constructor(configService) {
        this.configService = configService;
        this.llm = new groq_1.ChatGroq({
            model: this.configService.get('GROQ_MODEL'),
            apiKey: this.configService.get('GROQ_API_KEY'),
            temperature: 0,
        });
    }
    async getRespnseTest() {
        const db = await (0, database_config_1.dbLangChain)();
        const toolkit = new sql_1.SqlToolkit(db, this.llm);
        const tools = toolkit.getTools();
        const agentExecutor = (0, prebuilt_1.createReactAgent)({
            llm: this.llm,
            tools,
        });
        const systemPrompt = `
      Kamu adalah asisten AI yang membantu menganalisis dan menjawab pertanyaan berdasarkan data dalam database PostgreSQL terkait konsultasi kesehatan mental.

      🔹 Fokus data:
      - Tabel utama: consultation, consultation_detail, diagnosis_result, diagnosis_result_disorder, disorder, solution, symptom.
      - Hubungan antar tabel harus diperhatikan (gunakan JOIN jika relevan).
      - Jangan mengambil seluruh isi tabel tanpa filter.

      🔹 Batasan:
      - Maksimum 5 langkah reasoning.
      - Jangan memanggil SQL tools jika pertanyaan bisa dijawab langsung.
      - Jika pertanyaan terlalu umum, minta pengguna memberikan detail lebih lanjut (misalnya tanggal, nama pengguna, jenis gangguan).

      🔹 Gaya jawaban:
      - Singkat, jelas, dan padat.

      🔹 Format hasil:
      - Gunakan bullet point jika menjelaskan daftar.
      - Jika menampilkan hasil diagnosis, sebutkan: nama user, tanggal konsultasi, gangguan yang didiagnosis, berapa bobot gangguan dibuat menjadi persen,dan solusi yang diberikan.

      Jawaban harus bermanfaat, tidak bertele-tele, dan jika ada hasil kosong, jelaskan bahwa datanya tidak ditemukan.
      `;
        const exampleQuery = `
      berikan list gejala gejala yang ada di database
    `;
        const events = await agentExecutor.stream({
            messages: [
                ['system', systemPrompt],
                ['user', exampleQuery],
            ],
        }, { streamMode: 'values', recursionLimit: 15 });
        for await (const event of events) {
            const lastMsg = event.messages[event.messages.length - 1];
            if (lastMsg.tool_calls?.length) {
                console.dir(lastMsg.tool_calls, { depth: null });
            }
            else if (lastMsg.content) {
                console.log(lastMsg.content);
            }
        }
    }
};
exports.RagService = RagService;
exports.RagService = RagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RagService);
//# sourceMappingURL=rag.service.js.map