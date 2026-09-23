import { Pool } from "pg";

let pool;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  const config = connectionString
    ? {
        connectionString,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: true }
            : false,
      }
    : {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: true }
            : false,
      };

  if (
    !connectionString &&
    (!config.host ||
      !config.port ||
      !config.user ||
      !config.database ||
      !config.password)
  ) {
    throw new Error("Database configuration is missing");
  }

  pool = new Pool(config);
  return pool;
}

export async function query(text, values = []) {
  return getPool().query(text, values);
}
