"use server"

import { prisma } from "@/lib/config"
import type { SkillCategory, SkillLevel } from "@/lib/domain/enums"
import { z } from "zod"
import { ensureAdmin } from "./auth"

export async function listSkills() {
  await ensureAdmin()
  const skills = await prisma.skill.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { name: "asc" }],
  })
  return { skills }
}

const createSkillSchema = z.object({
  name: z.string().min(1),
  category: z.string().transform((v) => v as SkillCategory),
  level: z.string().transform((v) => v as SkillLevel),
  years: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  featured: z.boolean().optional(),
  order: z.number().nullable().optional(),
})

export async function createSkill(input: unknown) {
  await ensureAdmin()
  const parsed = createSkillSchema.parse(input) as unknown as { name: string; category: SkillCategory; level: SkillLevel; years?: number | null; description?: string | null; icon?: string | null; featured?: boolean; order?: number | null }
  const existing = await prisma.skill.findUnique({ where: { name: parsed.name } })
  if (existing) throw new Error("A skill with this name already exists")
  const skill = await prisma.skill.create({
    data: {
      name: parsed.name,
      category: parsed.category,
      level: parsed.level,
      years: parsed.years ?? null,
      description: parsed.description ?? null,
      icon: parsed.icon ?? null,
      featured: Boolean(parsed.featured),
      order: parsed.order ?? null,
    },
  })
  return { skill }
}

export async function getSkill(id: string) {
  await ensureAdmin()
  const skill = await prisma.skill.findUnique({ where: { id } })
  if (!skill) throw new Error("Skill not found")
  return { skill }
}

const updateSkillSchema = createSkillSchema.partial().extend({ id: z.string().min(1) })

export async function updateSkill(id: string, input: unknown) {
  await ensureAdmin()
  const parsed = updateSkillSchema.parse({ id, ...(input as object) }) as unknown as { id: string } & { name?: string; category?: SkillCategory; level?: SkillLevel; years?: number | null; description?: string | null; icon?: string | null; featured?: boolean; order?: number | null }

  const existing = await prisma.skill.findUnique({ where: { id: parsed.id } })
  if (!existing) throw new Error("Skill not found")

  if (parsed.name) {
    const nameConflict = await prisma.skill.findFirst({ where: { name: parsed.name, id: { not: parsed.id } } })
    if (nameConflict) throw new Error("A skill with this name already exists")
  }

  const skill = await prisma.skill.update({
    where: { id: parsed.id },
    data: {
      name: parsed.name ?? existing.name,
      category: parsed.category ?? existing.category,
      level: parsed.level ?? existing.level,
      years: parsed.years ?? existing.years,
      description: parsed.description ?? existing.description,
      icon: parsed.icon ?? existing.icon,
      featured: parsed.featured ?? existing.featured,
      order: parsed.order ?? existing.order,
    },
  })
  return { skill }
}

export async function deleteSkill(id: string) {
  await ensureAdmin()
  const existing = await prisma.skill.findUnique({ where: { id } })
  if (!existing) throw new Error("Skill not found")
  await prisma.skill.delete({ where: { id } })
  return { message: "Skill deleted successfully" }
}


