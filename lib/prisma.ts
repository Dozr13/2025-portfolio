// Yarn 4.9.2 with node-modules linker - Standard Prisma client
import { PrismaClient } from '@/generated/client'
import { envConfig, getDatabaseConfig } from './envConfig'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseConfig()
    }
  },
  log: envConfig.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (envConfig.NODE_ENV !== 'production') globalForPrisma.prisma = prisma