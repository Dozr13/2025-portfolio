import { prisma } from '@/lib/config'
import type { Skill } from '@/lib/types'
import { isValidToken } from '@/lib/utils/auth'
import { headers } from 'next/headers'

interface SkillsData {
  skills: Skill[]
  pagination: {
    pages: number
    total: number
  }
}

export const getServerSkillsData = async (): Promise<SkillsData | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Skills Service] Invalid or missing token')
      return null
    }

    console.log('[Skills Service] Fetching skills directly from database...')
    
    // Fetch skills directly from Prisma
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })

    const total = await prisma.skill.count()
    const pages = Math.ceil(total / 10) // Assuming 10 per page

    const skillsData = {
      skills: skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        years: skill.years,
        description: skill.description,
        icon: skill.icon,
        featured: skill.featured,
        order: skill.order,
        createdAt: skill.createdAt.toISOString(),
        updatedAt: skill.updatedAt.toISOString()
      })),
      pagination: {
        pages,
        total
      }
    }

    console.log('[Skills Service] Skills fetched successfully:', skills.length, 'skills')
    return skillsData
  } catch (error) {
    console.error('[Skills Service] Error fetching skills:', error)
    return null
  }
}

export const getServerSkillData = async (id: string): Promise<Skill | null> => {
  try {
    const headersList = await headers()
    const token = headersList.get('cookie')?.match(/adminToken=([^;]+)/)?.[1] || null

    if (!token || !(await isValidToken(token))) {
      console.log('[Skills Service] Invalid or missing token')
      return null
    }

    console.log('[Skills Service] Fetching skill directly from database:', id)
    
    // Fetch skill directly from Prisma
    const skill = await prisma.skill.findUnique({
      where: { id }
    })

    if (!skill) {
      console.log('[Skills Service] Skill not found:', id)
      return null
    }

    const skillData = {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      level: skill.level,
      years: skill.years,
      description: skill.description,
      icon: skill.icon,
      featured: skill.featured,
      order: skill.order,
      createdAt: skill.createdAt.toISOString(),
      updatedAt: skill.updatedAt.toISOString()
    }

    console.log('[Skills Service] Skill fetched successfully:', skill.name)
    return skillData
  } catch (error) {
    console.error('[Skills Service] Error fetching skill:', error)
    return null
  }
}
