"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLangChain = exports.datasource = void 0;
const sql_db_1 = require("langchain/sql_db");
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
});
const dbLangChain = async () => {
    return await sql_db_1.SqlDatabase.fromDataSourceParams({
        appDataSource: exports.datasource,
    });
};
exports.dbLangChain = dbLangChain;
//# sourceMappingURL=database.config.js.map