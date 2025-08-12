'use client'

import {
  deleteAdminBlogPost,
  getAdminBlogPost,
  updateAdminBlogPost
} from '@/app/actions/admin/blog'
import { AdminFormLayout } from '@/components/admin/forms/AdminFormLayout'
import type { BlogPost } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface EditBlogClientProps {
  initialData?: BlogPost | null
}

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  status: string
  featured: boolean
  metaTitle: string
  metaDescription: string
}

export const EditBlogClient = ({ initialData }: EditBlogClientProps) => {
  const router = useRouter()
  const [postData, setPostData] = useState<BlogPost | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    status: 'DRAFT',
    featured: false,
    metaTitle: '',
    metaDescription: ''
  })

  // Initialize form data when post data is available
  useEffect(() => {
    if (postData) {
      setFormData({
        title: postData.title || '',
        slug: postData.slug || '',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        category: postData.category || '',
        tags: postData.tags || '',
        status: postData.status || 'DRAFT',
        featured: postData.featured || false,
        metaTitle: postData.metaTitle || '',
        metaDescription: postData.metaDescription || ''
      })
    }
  }, [postData])

  // Fetch post data if not provided
  useEffect(() => {
    if (!initialData && postData?.id) {
      const fetchPost = async () => {
        try {
          setLoading(true)
          const { post } = await getAdminBlogPost(postData.id)
          // Normalize to match UI BlogPost type expectations
          setPostData({
            ...post,
            metaTitle: post.metaTitle ?? '',
            metaDescription: post.metaDescription ?? '',
            publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
            createdAt: new Date(post.createdAt),
            updatedAt: post.updatedAt ? new Date(post.updatedAt) : null
          } as unknown as BlogPost)
        } catch (error) {
          console.error('[Blog Edit] Error fetching post:', error)
          setError('Failed to load blog post')
          router.push('/admin/blog')
        } finally {
          setLoading(false)
        }
      }

      fetchPost()
    }
  }, [initialData, postData?.id, router])

  const updateField = (field: keyof BlogFormData, value: string | boolean) => {
    if (field === 'featured') {
      console.log('[Blog Edit] Featured checkbox changed:', value)
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim()) {
      setError('Blog post title is required')
      return
    }

    if (!postData?.id) {
      setError('Blog post ID not found')
      return
    }

    setSaving(true)
    try {
      console.log('[Blog Edit] Submitting update payload:', {
        id: postData.id,
        title: formData.title,
        slug: formData.slug,
        status: formData.status,
        featured: formData.featured
      })
      await updateAdminBlogPost({
        id: postData.id,
        ...{
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          tags: formData.tags,
          status: formData.status as 'DRAFT' | 'PUBLISHED',
          featured: formData.featured,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription
        }
      })

      router.push('/admin/blog')
    } catch (error) {
      console.error('[Blog Edit] Error updating post:', error)
      setError('Failed to update blog post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!postData?.id) return

    if (!confirm(`Are you sure you want to delete "${postData.title}"?`)) return

    setSaving(true)
    try {
      await deleteAdminBlogPost(postData.id)
      router.push('/admin/blog')
    } catch (error) {
      console.error('[Blog Edit] Error deleting post:', error)
      setError('Failed to delete blog post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminFormLayout
      title="Edit Blog Post"
      subtitle={`Update your blog post: ${postData?.title || ''}`}
      backHref="/admin/blog"
      backLabel="Back to Blog"
      onSubmit={handleSubmit}
      loading={saving}
      loadingText="Saving..."
      submitText="Save Changes"
      disabled={!formData.title}
      actionButtons={
        <button
          type="button"
          onClick={handleDelete}
          disabled={saving}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Post
        </button>
      }
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Enter blog post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="blog-post-url"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Brief description of the blog post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            value={formData.content}
            onChange={(e) => updateField('content', e.target.value)}
            rows={15}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            placeholder="Write your blog post content in Markdown..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., Technology, Tutorial"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => updateField('tags', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="react, typescript, web development"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="featured" className="text-sm">
              Featured post
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Title</label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => updateField('metaTitle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="SEO title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meta Description</label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => updateField('metaDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="SEO description"
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </AdminFormLayout>
  )
}
