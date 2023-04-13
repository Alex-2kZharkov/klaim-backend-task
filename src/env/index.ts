import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const APPLICATION_CONFIG = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
} as const;
