import { execSync } from 'node:child_process'

export function setupPrismaTests() {
  execSync(
    'yarn dotenv -e .env.test yarn prisma generate --schema ./src/shared/infrastructure/database/prisma/schema.prisma',
  )
  execSync(
    'yarn dotenv -e .env.test yarn prisma migrate deploy --schema ./src/users/infrastructure/database/prisma/users.prisma',
  )
}
