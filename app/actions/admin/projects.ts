"use server"

import type { Prisma } from "@/generated/client"
import { prisma } from "@/lib/config"
import type { ProjectCategory, ProjectStatus } from "@/lib/domain/enums"
import { z } from "zod"
import { ensureAdmin } from "./auth"

export async function listProjects(params: {
  page?: number
  limit?: number
  status?: string | null
  category?: string | null
  search?: string | null
}) {
  await ensureAdmin()
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const offset = (page - 1) * limit

  const where: Prisma.ProjectWhereInput = {}
  if (params.status) where.status = params.status as Prisma.EnumProjectStatusFilter
  if (params.category) where.category = params.category as Prisma.EnumProjectCategoryFilter
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
      { client: { contains: params.search, mode: "insensitive" } },
    ]
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: offset,
      take: limit,
      include: { projectSkills: { include: { skill: true } }, _count: { select: { projectViews: true } } },
    }),
    prisma.project.count({ where }),
  ])

  return { projects, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }
}

const projectCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  category: z.string().min(1),
  status: z.string().optional(),
  featured: z.boolean().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  client: z.string().optional(),
  teamSize: z.number().optional(),
  role: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  solutions: z.array(z.string()).optional(),
  metrics: z.record(z.string(), z.string()).optional(),
  order: z.number().optional(),
})

export async function createProject(data: unknown) {
  await ensureAdmin()
  const parsed = projectCreateSchema.parse(data)

  const existingProject = await prisma.project.findUnique({ where: { slug: parsed.slug } })
  if (existingProject) throw new Error("A project with this slug already exists")

  const project = await prisma.project.create({
    data: {
      title: parsed.title.trim(),
      slug: parsed.slug.trim(),
      description: parsed.description.trim(),
      longDescription: parsed.longDescription?.trim() || null,
      category: parsed.category as ProjectCategory,
      status: (parsed.status as ProjectStatus) || ("COMPLETED" as ProjectStatus),
      featured: parsed.featured || false,
      demoUrl: parsed.demoUrl?.trim() || null,
      githubUrl: parsed.githubUrl?.trim() || null,
      images: parsed.images ? JSON.stringify(parsed.images) : null,
      thumbnail: parsed.thumbnail?.trim() || null,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      endDate: parsed.endDate ? new Date(parsed.endDate) : null,
      client: parsed.client?.trim() || null,
      teamSize: parsed.teamSize || null,
      role: parsed.role?.trim() || null,
      challenges: parsed.challenges ? JSON.stringify(parsed.challenges) : null,
      solutions: parsed.solutions ? JSON.stringify(parsed.solutions) : null,
      metrics: parsed.metrics ? JSON.stringify(parsed.metrics) : null,
      order: parsed.order || null,
    },
  })

  return { success: true as const, message: "Project created successfully", project }
}

const projectUpdateSchema = projectCreateSchema.partial().extend({ id: z.string().min(1) })

export async function updateProject(input: unknown) {
  await ensureAdmin()
  const { id, ...raw } = projectUpdateSchema.parse(input)

  const data: Prisma.ProjectUpdateInput = {}
  if (raw.title) data.title = raw.title.trim()
  if (raw.slug) data.slug = raw.slug.trim()
  if (raw.description) data.description = raw.description.trim()
  if (raw.longDescription !== undefined) data.longDescription = raw.longDescription?.trim() || null
  if (raw.category) data.category = raw.category as ProjectCategory
  if (raw.status) data.status = raw.status as ProjectStatus
  if (raw.featured !== undefined) data.featured = raw.featured
  if (raw.demoUrl !== undefined) data.demoUrl = raw.demoUrl?.trim() || null
  if (raw.githubUrl !== undefined) data.githubUrl = raw.githubUrl?.trim() || null
  if (raw.images) data.images = JSON.stringify(raw.images)
  if (raw.thumbnail !== undefined) data.thumbnail = raw.thumbnail?.trim() || null
  if (raw.startDate) data.startDate = new Date(raw.startDate)
  if (raw.endDate) data.endDate = new Date(raw.endDate)
  if (raw.client !== undefined) data.client = raw.client?.trim() || null
  if (raw.teamSize !== undefined) data.teamSize = raw.teamSize
  if (raw.role !== undefined) data.role = raw.role?.trim() || null
  if (raw.challenges) data.challenges = JSON.stringify(raw.challenges)
  if (raw.solutions) data.solutions = JSON.stringify(raw.solutions)
  if (raw.metrics) data.metrics = JSON.stringify(raw.metrics)
  if (raw.order !== undefined) data.order = raw.order

  const project = await prisma.project.update({ where: { id }, data })
  return { success: true as const, message: "Project updated successfully", project }
}

export async function getProject(id: string) {
  await ensureAdmin()
  const project = await prisma.project.findUnique({ where: { id }, include: { _count: { select: { projectViews: true } } } })
  if (!project) throw new Error("Project not found")
  return { success: true as const, project }
}

export async function deleteProject(id: string) {
  await ensureAdmin()
  await prisma.project.delete({ where: { id } })
  return { success: true as const, message: "Project deleted successfully" }
}


