import { Pool } from "pg"

// Database connection singleton
let pool: Pool | null = null

export function getDb() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  }
  return pool
}

export const db = {
  query: (text: string, params?: any[]) => getDb().query(text, params),
  getClient: () => getDb().connect(),
}
