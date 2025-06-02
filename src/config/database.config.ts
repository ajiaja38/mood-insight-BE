import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const datasource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

export const dbLangChain = async (): Promise<SqlDatabase> => {
  return await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
};
