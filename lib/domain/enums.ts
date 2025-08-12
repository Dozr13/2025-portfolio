// Domain enums for use in client code (do NOT import Prisma client into the browser)

// Contact
export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM'
export const CONTACT_STATUSES: readonly ContactStatus[] = [
  'NEW',
  'IN_PROGRESS',
  'RESPONDED',
  'CLOSED',
  'SPAM'
] as const

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export const PRIORITIES: readonly Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const

// Blog
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export const POST_STATUSES: readonly PostStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const

// Skills
export type SkillCategory =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DATABASE'
  | 'DEVOPS'
  | 'TOOLS'
  | 'DESIGN'
  | 'SOFT_SKILLS'
export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  'FRONTEND',
  'BACKEND',
  'DATABASE',
  'DEVOPS',
  'TOOLS',
  'DESIGN',
  'SOFT_SKILLS'
] as const

export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
export const SKILL_LEVELS: readonly SkillLevel[] = [
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'EXPERT'
] as const

// Projects
export type ProjectCategory =
  | 'WEB_APP'
  | 'MOBILE_APP'
  | 'API'
  | 'LIBRARY'
  | 'TOOL'
  | 'WEBSITE'
  | 'ECOMMERCE'
  | 'DASHBOARD'
export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  'WEB_APP',
  'MOBILE_APP',
  'API',
  'LIBRARY',
  'TOOL',
  'WEBSITE',
  'ECOMMERCE',
  'DASHBOARD'
] as const

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'MAINTAINED' | 'ARCHIVED'
export const PROJECT_STATUSES: readonly ProjectStatus[] = [
  'PLANNING',
  'IN_PROGRESS',
  'COMPLETED',
  'MAINTAINED',
  'ARCHIVED'
] as const
