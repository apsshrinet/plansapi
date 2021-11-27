import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

export const db = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(<string>process.env.PGPORT),
});


