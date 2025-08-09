"use client"

import { createAdminBlogPost } from "@/app/actions/admin/blog"
import { AdminFormLayout } from "@/components/admin/forms/AdminFormLayout"
import { useRouter } from "next/navigation"
import { useState } from "react"

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

export const NewBlogClient = () => {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "DRAFT",
    featured: false,
    metaTitle: "",
    metaDescription: ""
  })

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const updateField = (field: keyof BlogFormData, value: string | boolean) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }

      // Auto-generate slug and meta title when title changes
      if (field === 'title') {
        newData.slug = generateSlug(value as string)
        newData.metaTitle = value as string
      }

      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim()) {
      setError("Blog post title is required")
      return
    }

    setSaving(true)
    try {
      await createAdminBlogPost({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        status: formData.status as "DRAFT" | "PUBLISHED",
        featured: formData.featured,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        readingTime: Math.ceil(formData.content.split(' ').length / 200) // Estimate reading time
      })

      router.push("/admin/blog")
    } catch (error) {
      console.error('[Blog New] Error creating post:', error)
      setError("Failed to create blog post")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminFormLayout
      title="Create New Blog Post"
      subtitle="Add a new blog post to your portfolio"
      backHref="/admin/blog"
      backLabel="Back to Blog"
      onSubmit={handleSubmit}
      loading={saving}
      loadingText="Creating..."
      submitText="Create Post"
      disabled={!formData.title}
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
            <label htmlFor="featured" className="text-sm">Featured post</label>
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
