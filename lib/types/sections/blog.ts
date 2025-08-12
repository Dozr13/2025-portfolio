import { PublicBlogPost } from "../public"

export type BlogClientProps = Readonly<{
  posts: PublicBlogPost[]
  immediate?: boolean
}>

export type BlogSuspenseProps = Readonly<{
  posts: PublicBlogPost[]
}>

export type BlogListingClientProps = Readonly<{
  posts: PublicBlogPost[]
  currentPage: number
  totalPages: number
  totalPosts: number
  search: string
}>
