import { DB } from './types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { expand } from 'dotenv-expand';
import { config } from 'dotenv';

expand(config());

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
}).withSchema('nextAppKysely')