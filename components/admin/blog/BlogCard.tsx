import { Icon } from '@/components/ui/Icon'
import type { BlogPost } from '@/lib/types'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPost
  onDelete: (id: string, title: string) => void
  deleting: string | null
}

export const BlogCard = ({ post, onDelete, deleting }: BlogCardProps) => {
  const isDeleting = deleting === post.id

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg text-foreground">{post.title}</h3>
            {post.featured && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">Featured</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {post.excerpt || 'No excerpt available'}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Status: {post.status}</span>
            <span>Views: {post.views}</span>
            {post.category && <span>Category: {post.category}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {post.updatedAt
            ? `Updated: ${new Date(post.updatedAt).toLocaleDateString()}`
            : 'Updated: —'}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/blog/edit/${post.id}`}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Edit post"
          >
            <Icon name="square-pen" className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(post.id, post.title)}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
            title="Delete post"
          >
            <Icon name="trash-2" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isDeleting && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          Deleting post...
        </div>
      )}
    </div>
  )
}
