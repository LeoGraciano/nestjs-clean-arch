import fs from 'fs'
export function setupPrismaTests() {
  const envFilePath = '.env.test'
  const envConfig = fs.readFileSync(envFilePath, 'utf8')
  const match = envConfig.match(/DATABASE_URL="(.+)"/)

  if (!match || match.length < 2) {
    throw new Error(`Failed to find DATABASE_URL in ${envFilePath}`)
  }

  const databaseUrl = match[1]
  process.env.DATABASE_URL = databaseUrl
}
