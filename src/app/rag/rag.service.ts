import { ChatGroq } from '@langchain/groq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dbLangChain } from 'src/config/database.config';
import { SqlToolkit } from 'langchain/agents/toolkits/sql';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SqlDatabase } from 'langchain/sql_db';

@Injectable()
export class RagService {
  private llm: ChatGroq;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatGroq({
      model: this.configService.get<string>('GROQ_MODEL') as string,
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
      temperature: 0,
    });
  }

  public async getRespnseTest(): Promise<void> {
    const db: SqlDatabase = await dbLangChain();
    const toolkit: SqlToolkit = new SqlToolkit(db, this.llm);
    const tools = toolkit.getTools();

    const agentExecutor = createReactAgent({
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

    const events = await agentExecutor.stream(
      {
        messages: [
          ['system', systemPrompt],
          ['user', exampleQuery],
        ],
      },
      { streamMode: 'values', recursionLimit: 15 },
    );

    for await (const event of events) {
      const lastMsg = event.messages[event.messages.length - 1];
      if (lastMsg.tool_calls?.length) {
        console.dir(lastMsg.tool_calls, { depth: null });
      } else if (lastMsg.content) {
        console.log(lastMsg.content);
      }
    }
  }
}
