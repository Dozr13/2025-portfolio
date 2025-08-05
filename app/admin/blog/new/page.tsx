"use client"

import { Icon } from "@/components/ui/icon"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface BlogPostData {
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
}

export default function NewBlogPost() {
  const [postData, setPostData] = useState<BlogPostData>({
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

  const [previewMode, setPreviewMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setPostData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      metaTitle: title
    }))
  }

  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6 text-foreground">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8 text-foreground">$1</h1>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'text'
        return `<div class="my-6 rounded-lg border border-border bg-slate-950 overflow-hidden">
          <div class="px-4 py-2 bg-slate-800 text-xs text-slate-400 uppercase">${language}</div>
          <pre class="p-4 overflow-x-auto text-sm text-slate-100"><code>${code.trim()}</code></pre>
        </div>`
      })
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim() === '') return ''
        if (paragraph.includes('<h') || paragraph.includes('<div') || paragraph.includes('<pre')) {
          return paragraph
        }
        return `<p class="mb-4 leading-relaxed">${paragraph.trim()}</p>`
      })
      .join('\n')
  }

  const saveDraft = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...postData,
          readingTime: Math.ceil(postData.content.split(' ').length / 200) // Estimate reading time
        })
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/admin/blog/${data.post.id}`)
      } else {
        alert("Failed to save post")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  const publish = async () => {
    await saveDraft()
    // Additional publish logic if needed
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Icon name="arrow-left" size="md" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">New Blog Post</h1>
                <p className="text-sm text-muted-foreground">Create and publish content</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${previewMode
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-foreground hover:bg-accent/80"
                  }`}
              >
                <Icon name="eye" size="sm" className="inline mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </button>

              <button
                onClick={saveDraft}
                disabled={saving || !postData.title}
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>

              <button
                onClick={publish}
                disabled={saving || !postData.title || !postData.content}
                className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!previewMode ? (
          /* Editor Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 text-2xl font-bold bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL Slug</label>
                <input
                  type="text"
                  value={postData.slug}
                  onChange={(e) => setPostData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-slug"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
                <textarea
                  value={postData.excerpt}
                  onChange={(e) => setPostData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post..."
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content (Markdown)</label>
                <textarea
                  value={postData.content}
                  onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog post content in Markdown..."
                  rows={20}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-vertical"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supports Markdown: **bold**, *italic*, `code`, ```code blocks```, # headings
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Publishing</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                    <select
                      value={postData.status}
                      onChange={(e) => setPostData(prev => ({ ...prev, status: e.target.value as "DRAFT" | "PUBLISHED" }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      onChange={(e) => setPostData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-border"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-foreground">
                      Featured Post
                    </label>
                  </div>
                </div>
              </div>

              {/* Categories & Tags */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Categories & Tags</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <input
                      type="text"
                      value={postData.category}
                      onChange={(e) => setPostData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Frontend, Backend, DevOps..."
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                    <input
                      type="text"
                      value={postData.tags}
                      onChange={(e) => setPostData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="react, typescript, nextjs (comma separated)"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">SEO Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={postData.metaTitle}
                      onChange={(e) => setPostData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      placeholder="SEO title (auto-filled from title)"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Meta Description</label>
                    <textarea
                      value={postData.metaDescription}
                      onChange={(e) => setPostData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      placeholder="SEO description for search engines..."
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Preview Mode */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Preview Header */}
            <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="eye" size="sm" className="text-yellow-500" />
                <span className="text-yellow-500 font-medium">Preview Mode</span>
              </div>
              <p className="text-sm text-muted-foreground">This is how your blog post will appear to readers</p>
            </div>

            {/* Preview Content */}
            <article className="bg-card border border-border rounded-xl p-8">
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {postData.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {postData.category}
                  </span>
                )}
                <span>5 min read</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold gradient-text-title mb-6 leading-tight">
                {postData.title || "Your Blog Post Title"}
              </h1>

              {/* Excerpt */}
              {postData.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {postData.excerpt}
                </p>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(postData.content || "Start writing your content...")
                }}
              />

              {/* Tags */}
              {postData.tags && (
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </motion.div>
        )}
      </div>
    </div>
  )
}