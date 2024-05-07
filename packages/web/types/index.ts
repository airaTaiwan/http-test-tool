export interface ParseData {
  id: number
  url: string
  created_at: string
  event: string
  data: string
}

export interface Data {
  id: number
  url: string
  created_at: string
  event: string
  data: Record<string, string | number | boolean>
}
