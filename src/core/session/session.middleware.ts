import { RequestHandler } from '@nestjs/common/interfaces';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

import { APPLICATION_CONFIG } from '../../env';
import { ONE_MINUTE_IN_MILLISECONDS } from '../../constants';

const pgPool = new Pool({
  connectionString: APPLICATION_CONFIG.DATABASE_URL,
});
const pgSession = connectPgSimple(session);

export const expressSession = (): RequestHandler => {
  return session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'tokens',
    }),
    secret: APPLICATION_CONFIG.SESSION_SECRET,
    cookie: { maxAge: ONE_MINUTE_IN_MILLISECONDS, sameSite: 'none', secure: true },
    resave: false,
    saveUninitialized: false,
  });
};
