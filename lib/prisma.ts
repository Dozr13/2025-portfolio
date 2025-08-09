import { prisma as sharedPrisma } from './config/database'
 
export const prisma = sharedPrisma

export type PrismaClientInstance = typeof prisma
