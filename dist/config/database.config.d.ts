import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';
import 'dotenv/config';
export declare const datasource: DataSource;
export declare const dbLangChain: () => Promise<SqlDatabase>;
