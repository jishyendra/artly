import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL! as string,
});

const db = drizzle(pool);
export { db };
