import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config()

class DatabaseConsole {
    private readonly logger = new Logger(DatabaseConsole.name);

    constructor() {
        this.logger.log('Database Configuration:');
    }
}

new DatabaseConsole();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: ['dist/shared/entities/*.{ts,js}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
});