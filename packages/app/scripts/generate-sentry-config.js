/**
 * Generates sentry.options.json from environment variables.
 *
 * The Sentry Expo plugin reads this file at prebuild time for native init
 * (useNativeInit). Since JSON can't reference env vars, we generate it.
 *
 * Runs automatically on EAS via the "eas-build-post-install" script
 * (after pnpm install, before expo prebuild).
 *
 * For local dev: node scripts/generate-sentry-config.js
 */

const fs = require('node:fs')
const path = require('node:path')

function getDsn() {
  // EAS builds inject env vars directly
  if (process.env.EXPO_PUBLIC_SENTRY_DSN) {
    return process.env.EXPO_PUBLIC_SENTRY_DSN
  }

  // Local dev: parse .env file
  const envPath = path.resolve(__dirname, '..', '.env')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8')
    const match = content.match(/^EXPO_PUBLIC_SENTRY_DSN=(.+)$/m)
    if (match) {
      return match[1].trim()
    }
  }

  return null
}

const dsn = getDsn()

if (!dsn) {
  console.warn('⚠️  EXPO_PUBLIC_SENTRY_DSN not found — skipping sentry.options.json generation')
  process.exit(0)
}

const config = { dsn }
const outputPath = path.resolve(__dirname, '..', 'sentry.options.json')

fs.writeFileSync(outputPath, `${JSON.stringify(config, null, 2)}\n`)
console.log(`✅ Generated sentry.options.json with DSN`)
