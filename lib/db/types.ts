// Centralized Prisma types for server-side usage only
// Avoid importing Prisma enums into client; prefer app domain enums in lib/domain/enums

export type { $Enums, Prisma } from '@/generated/client'
