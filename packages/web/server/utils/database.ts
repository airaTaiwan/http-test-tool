import type { Data } from '~/types'

export function migrateDatabase() {
  const db = useDatabase()
  db.sql`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url TEXT,
    event TEXT,
    data TEXT
  )`
}

export async function addUrl(url: string, event: string, data: Record<string, any>) {
  const db = useDatabase()

  await db.sql`INSERT INTO urls (url, event, data) VALUES (${url}, ${event}, ${JSON.stringify(data)})`
}

export async function getUrls(count = 5) {
  const db = useDatabase()
  const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at ASC LIMIT ${count}`
  return rows
}

export async function getLatestUrl() {
  const db = useDatabase()

  // 查询最新的 URL 记录
  const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at DESC LIMIT 1`

  // 如果查询成功返回数据，则返回第一条数据；如果没有数据，返回 null
  if (rows.length > 0)
    return rows[0]
  else
    return null
}
