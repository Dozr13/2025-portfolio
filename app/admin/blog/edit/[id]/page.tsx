"use client"

import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface BlogPostData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  status: "DRAFT" | "PUBLISHED"
  featured: boolean
  metaTitle: string
  metaDescription: string
  author: string
  publishedAt: string | null
  readingTime: number | null
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const [postData, setPostData] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const router = useRouter()


  const fetchBlogPost = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPostData(data.post)
      } else {
        console.error("Failed to fetch blog post")
        router.push("/admin/blog")
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      router.push("/admin/blog")
    } finally {
      setLoading(false)
    }
  }, [params.id, router])

  // Fetch blog post data
  useEffect(() => {
    fetchBlogPost()
  }, [fetchBlogPost, params.id])

  const handleSave = async () => {
    if (!postData) return

    setSaving(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        router.push("/admin/blog")
      } else {
        console.error("Failed to update blog post")
      }
    } catch (error) {
      console.error("Error updating blog post:", error)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof BlogPostData, value: string | boolean) => {
    if (!postData) return

    setPostData(prev => prev ? {
      ...prev,
      [field]: value
    } : null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!postData) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blog"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Blog Management
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold">Edit Blog Post</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                {previewMode ? "Edit" : "Preview"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={postData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter blog post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={postData.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="blog-post-url"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={postData.excerpt || ""}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Brief description of the blog post"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                value={postData.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={20}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                placeholder="Write your blog post content in Markdown..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium mb-4">Publish Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={postData.status}
                    onChange={(e) => updateField("status", e.target.value as "DRAFT" | "PUBLISHED")}
                    className="w-full p-2 border border-border rounded bg-background"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={postData.featured}
                    onChange={(e) => updateField("featured", e.target.checked)}
                    className="rounded border-border"
                  />
                  <label htmlFor="featured" className="text-sm">Featured post</label>
                </div>
              </div>
            </div>

            {/* Categories & Tags */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium mb-4">Categories & Tags</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={postData.category || ""}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full p-2 border border-border rounded bg-background"
                    placeholder="e.g., Technology, Tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    value={postData.tags || ""}
                    onChange={(e) => updateField("tags", e.target.value)}
                    className="w-full p-2 border border-border rounded bg-background"
                    placeholder="react, typescript, web development"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium mb-4">SEO Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={postData.metaTitle || ""}
                    onChange={(e) => updateField("metaTitle", e.target.value)}
                    className="w-full p-2 border border-border rounded bg-background"
                    placeholder="SEO title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    value={postData.metaDescription || ""}
                    onChange={(e) => updateField("metaDescription", e.target.value)}
                    rows={3}
                    className="w-full p-2 border border-border rounded bg-background"
                    placeholder="SEO description"
                  />
                </div>
              </div>
            </div>

            {/* Post Info */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium mb-4">Post Information</h3>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Author: {postData.author}</div>
                {postData.publishedAt && (
                  <div>Published: {new Date(postData.publishedAt).toLocaleDateString()}</div>
                )}
                {postData.readingTime && (
                  <div>Reading Time: {postData.readingTime} min</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}