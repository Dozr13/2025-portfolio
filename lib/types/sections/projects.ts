import type { PublicProject } from '@/lib/types/public'
import type { ViewMode } from '@/lib/types/ui/view'

export type ProjectsClientProps = Readonly<{
  projects: PublicProject[]
  mode?: ViewMode
  immediate?: boolean
}>

export type ProjectsSuspenseProps = Readonly<{
  projects: PublicProject[]
  mode?: ViewMode
}>
