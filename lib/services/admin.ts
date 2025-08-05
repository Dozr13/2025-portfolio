import { Prisma } from '../../generated/client'

// Admin API service functions
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem("adminToken")}`,
  'Content-Type': 'application/json'
})

// Auth services
export const authService = {
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

// Blog services
export const blogService = {
  async fetchPosts(params: { page?: number; limit?: number; search?: string; status?: string } = {}) {
    const searchParams = new URLSearchParams({
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '10'
    })
    
    if (params.search) searchParams.append('search', params.search)
    if (params.status) searchParams.append('status', params.status)

    const response = await fetch(`/api/admin/blog?${searchParams}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch posts')
    return response.json()
  },

  async deletePost(id: string) {
    const response = await fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to delete post')
    return response.json()
  },

  async fetchPost(id: string) {
    const response = await fetch(`/api/admin/blog/${id}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch post')
    return response.json()
  },

  async updatePost(id: string, data: Prisma.BlogPostUpdateInput) {
    const response = await fetch(`/api/admin/blog/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to update post')
    return response.json()
  },

  async createPost(data: Prisma.BlogPostCreateInput) {
    const response = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to create post')
    return response.json()
  }
}

// Projects services
export const projectsService = {
  async fetchProjects(params: { page?: number; limit?: number; search?: string; status?: string; category?: string } = {}) {
    const searchParams = new URLSearchParams({
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '10'
    })
    
    if (params.search) searchParams.append('search', params.search)
    if (params.status) searchParams.append('status', params.status)
    if (params.category) searchParams.append('category', params.category)

    const response = await fetch(`/api/admin/projects?${searchParams}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch projects')
    return response.json()
  },

  async deleteProject(id: string) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to delete project')
    return response.json()
  },

  async fetchProject(id: string) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch project')
    return response.json()
  },

  async updateProject(id: string, data: Prisma.ProjectUpdateInput) {
    const response = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to update project')
    return response.json()
  },

  async createProject(data: Prisma.ProjectCreateInput) {
    const response = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to create project')
    return response.json()
  }
}

// Contacts services
export const contactsService = {
  async fetchContacts(params: { page?: number; limit?: number; search?: string; status?: string } = {}) {
    const searchParams = new URLSearchParams({
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '10'
    })
    
    if (params.search) searchParams.append('search', params.search)
    if (params.status) searchParams.append('status', params.status)

    const response = await fetch(`/api/admin/contacts?${searchParams}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch contacts')
    return response.json()
  },

  async updateContactStatus(contactId: string, status: string, priority?: string, notes?: string) {
    const response = await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        id: contactId,
        status,
        ...(priority && { priority }),
        ...(notes !== undefined && { notes })
      })
    })
    
    if (!response.ok) throw new Error('Failed to update contact')
    return response.json()
  }
}

// Analytics services  
export const analyticsService = {
  async fetchStats(timeRange = '7d') {
    const response = await fetch(`/api/admin/stats?timeRange=${timeRange}`, {
      headers: getAuthHeaders()
    })
    
    if (!response.ok) throw new Error('Failed to fetch analytics')
    return response.json()
  }
}

// Dashboard services
export const dashboardService = {
  async fetchDashboardData() {
    const [statsRes, contactsRes] = await Promise.all([
      fetch('/api/admin/stats', { headers: getAuthHeaders() }),
      fetch('/api/admin/contacts', { headers: getAuthHeaders() })
    ])

    const results: { stats?: unknown; recentContacts?: unknown } = {}
    
    if (statsRes.ok) {
      results.stats = await statsRes.json()
    }
    
    if (contactsRes.ok) {
      const contactsData = await contactsRes.json()
      results.recentContacts = contactsData.contacts.slice(0, 5)
    }
    
    return results
  }
}