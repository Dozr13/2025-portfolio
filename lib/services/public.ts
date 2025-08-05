// Public API service functions

// Skills services
export const skillsService = {
  async fetchSkills(params: { featured?: boolean; category?: string } = {}) {
    const searchParams = new URLSearchParams()
    
    if (params.featured) searchParams.append('featured', 'true')
    if (params.category) searchParams.append('category', params.category)

    const response = await fetch(`/api/skills?${searchParams}`)
    
    if (!response.ok) throw new Error('Failed to fetch skills')
    return response.json()
  }
}

// Blog services  
export const publicBlogService = {
  async fetchPosts(params: { page?: number; limit?: number } = {}) {
    const searchParams = new URLSearchParams({
      page: params.page?.toString() || '1',
      limit: params.limit?.toString() || '10'
    })

    const response = await fetch(`/api/blog?${searchParams}`)
    
    if (!response.ok) throw new Error('Failed to fetch blog posts')
    return response.json()
  },

  async fetchPost(slug: string) {
    const response = await fetch(`/api/blog/${slug}`)
    
    if (!response.ok) throw new Error('Failed to fetch blog post')
    return response.json()
  }
}

// Contact services
export const contactService = {
  async submitContact(data: {
    name: string
    email: string
    subject?: string
    message: string
    phone?: string
    company?: string
    website?: string
    budget?: string
    timeline?: string
    source?: string
  }) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to submit contact form')
    return response.json()
  }
}