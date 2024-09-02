import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '../models/database';
import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
console.log(process.env.DATABASE_URL);
const dialect = new PostgresDialect({
  pool: new Pool({ connectionString: process.env.DATABASE_URL }),
});

export const db = new Kysely<Database>({
  dialect,
});
