import { Prisma } from '../../generated/client'

// Admin service layer with proper typing and separation from public services
const getAuthHeaders = () => {
  if (typeof window === 'undefined') {
    throw new Error('Auth headers can only be accessed on the client side')
  }
  
  return {
    'Authorization': `Bearer ${localStorage.getItem("adminToken")}`,
    'Content-Type': 'application/json'
  } as const
}

// Generic API client for admin operations
export const apiClient = {
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(endpoint, window.location.origin)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)
    return response.json()
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error(`Failed to create resource`)
    return response.json()
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error(`Failed to update resource`)
    return response.json()
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error(`Failed to delete resource`)
    return response.json()
  }
} as const

// Type-safe entity definitions
export type EntityType = 'projects' | 'skills' | 'contacts' | 'blog'

// Admin services with proper typing and specific method names
export const adminService = {
  // Projects
  projects: {
    async fetchProjects(params: Record<string, string> = {}) {
      return apiClient.get<{
        projects: Array<{
          id: string
          title: string
          slug: string
          description: string
          category: string
          status: string
          featured: boolean
          demoUrl?: string
          githubUrl?: string
          createdAt: string
          updatedAt: string
          _count: { projectViews: number }
        }>
        pagination: {
          pages: number
          total: number
        }
      }>('/api/admin/projects', params)
    },
    
    async fetchProject(id: string) {
      return apiClient.get<{
        project: {
          id: string
          title: string
          slug: string
          description: string
          longDescription: string
          category: string
          status: string
          featured: boolean
          demoUrl: string | null
          githubUrl: string | null
          client: string | null
          teamSize: number | null
          role: string | null
          order: number | null
          createdAt: string
          updatedAt: string
        }
      }>(`/api/admin/projects/${id}`)
    },
    
    async createProject(data: Prisma.ProjectCreateInput) {
      return apiClient.post<{ project: unknown }>('/api/admin/projects', data)
    },
    
    async updateProject(id: string, data: Prisma.ProjectUpdateInput) {
      return apiClient.put<{ project: unknown }>(`/api/admin/projects/${id}`, data)
    },
    
    async deleteProject(id: string) {
      return apiClient.delete<{ success: boolean }>(`/api/admin/projects/${id}`)
    },
    
    // Generic methods for new clean hooks
    async fetchMany(params: Record<string, string> = {}) {
      return this.fetchProjects(params)
    },
    async fetchOne(id: string) {
      return this.fetchProject(id)
    },
    async create(data: Prisma.ProjectCreateInput) {
      return this.createProject(data)
    },
    async update(id: string, data: Prisma.ProjectUpdateInput) {
      return this.updateProject(id, data)
    },
    async delete(id: string) {
      return this.deleteProject(id)
    }
  },

  // Skills
  skills: {
    async fetchSkills(params: Record<string, string> = {}) {
      return apiClient.get<{
        skills: Array<{
          id: string
          name: string
          category: string
          level: string
          years: number | null
          description: string | null
          icon: string | null
          featured: boolean
          order: number | null
          createdAt: string
          updatedAt: string
        }>
        pagination: {
          pages: number
          total: number
        }
      }>('/api/admin/skills', params)
    },
    
    async fetchSkill(id: string) {
      return apiClient.get<{
        skill: {
          id: string
          name: string
          category: string
          level: string
          years: number | null
          description: string | null
          icon: string | null
          featured: boolean
          order: number | null
          createdAt: string
          updatedAt: string
        }
      }>(`/api/admin/skills/${id}`)
    },
    
    async createSkill(data: Prisma.SkillCreateInput) {
      return apiClient.post<{ skill: unknown }>('/api/admin/skills', data)
    },
    
    async updateSkill(id: string, data: Prisma.SkillUpdateInput) {
      return apiClient.put<{ skill: unknown }>(`/api/admin/skills/${id}`, data)
    },
    
    async deleteSkill(id: string) {
      return apiClient.delete<{ success: boolean }>(`/api/admin/skills/${id}`)
    },
    
    // Generic methods for new clean hooks
    async fetchMany(params: Record<string, string> = {}) {
      return this.fetchSkills(params)
    },
    async fetchOne(id: string) {
      return this.fetchSkill(id)
    },
    async create(data: Prisma.SkillCreateInput) {
      return this.createSkill(data)
    },
    async update(id: string, data: Prisma.SkillUpdateInput) {
      return this.updateSkill(id, data)
    },
    async delete(id: string) {
      return this.deleteSkill(id)
    }
  },

  // Contacts
  contacts: {
    async fetchContacts(params: Record<string, string> = {}) {
      return apiClient.get<{
        contacts: Array<{
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          phone: string | null
          company: string | null
          website: string | null
          budget: string | null
          timeline: string | null
          source: string | null
          status: string
          priority: string
          notes: string | null
          createdAt: string
          updatedAt: string
          respondedAt: string | null
        }>
        pagination: {
          total: number
          pages: number
        }
      }>('/api/admin/contacts', params)
    },
    
    async updateContactStatus(id: string, status: string, notes?: string) {
      return apiClient.put<{ contact: unknown }>(`/api/admin/contacts/${id}`, { status, notes })
    },
    
    async deleteContact(id: string) {
      return apiClient.delete<{ success: boolean }>(`/api/admin/contacts/${id}`)
    },
    
    // Generic methods for new clean hooks
    async fetchMany(params: Record<string, string> = {}) {
      return this.fetchContacts(params)
    },
    async fetchOne(id: string) {
      return apiClient.get<{ contact: unknown }>(`/api/admin/contacts/${id}`)
    },
    async create(data: Prisma.ContactCreateInput) {
      return apiClient.post<{ contact: unknown }>('/api/admin/contacts', data)
    },
    async update(id: string, data: Prisma.ContactUpdateInput) {
      return apiClient.put<{ contact: unknown }>(`/api/admin/contacts/${id}`, data)
    },
    async delete(id: string) {
      return this.deleteContact(id)
    }
  },

  // Blog
  blog: {
    async fetchPosts(params: Record<string, string> = {}) {
      return apiClient.get<{
        posts: Array<{
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          status: string
          category: string | null
          tags: string | null
          readingTime: number | null
          views: number
          publishedAt: string | null
          createdAt: string
          updatedAt: string
          author: string
          featured: boolean
          _count: {
            comments: number
          }
        }>
        pagination: {
          pages: number
          total: number
        }
      }>('/api/admin/blog', params)
    },
    
    async fetchPost(id: string) {
      return apiClient.get<{ post: unknown }>(`/api/admin/blog/${id}`)
    },
    
    async createPost(data: Prisma.BlogPostCreateInput) {
      return apiClient.post<{ post: unknown }>('/api/admin/blog', data)
    },
    
    async updatePost(id: string, data: Prisma.BlogPostUpdateInput) {
      return apiClient.put<{ post: unknown }>(`/api/admin/blog/${id}`, data)
    },
    
    async deletePost(id: string) {
      return apiClient.delete<{ success: boolean }>(`/api/admin/blog/${id}`)
    },
    
    // Generic methods for new clean hooks
    async fetchMany(params: Record<string, string> = {}) {
      return this.fetchPosts(params)
    },
    async fetchOne(id: string) {
      return this.fetchPost(id)
    },
    async create(data: Prisma.BlogPostCreateInput) {
      return this.createPost(data)
    },
    async update(id: string, data: Prisma.BlogPostUpdateInput) {
      return this.updatePost(id, data)
    },
    async delete(id: string) {
      return this.deletePost(id)
    }
  },

  // Auth
  auth: {
    async login(credentials: { username: string; password: string }) {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Invalid credentials')
      }
      
      return response.json()
    }
  }
} as const

// Backward compatibility - keep old service names working
export const authService = adminService.auth
export const projectsService = adminService.projects
export const skillsService = adminService.skills
export const contactsService = adminService.contacts
export const blogService = adminService.blog