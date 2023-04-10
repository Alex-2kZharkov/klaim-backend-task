import * as dotenv from 'dotenv';

dotenv.config();

export const APPLICATION_CONFIG = {
  PORT: process.env.PORT,
} as const;
