export interface Session {
  _id?: string,
  duration?: number,
  date: string,
  username: string,
  ip: string,
  browser: string,
  action: string
}
