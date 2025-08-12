import type { PublicSkill } from '@/lib/types/public'
import type { ViewMode } from '@/lib/types/ui/view'

export type SkillsClientProps = Readonly<{
  skills: PublicSkill[]
  mode?: ViewMode
  immediate?: boolean
}>

export type SkillsSuspenseProps = Readonly<{
  skills: PublicSkill[]
  mode?: ViewMode
}>

export type SkillsFullProps = Readonly<{
  skills: PublicSkill[]
  className?: string
  showCategories?: boolean
  showAllTab?: boolean
}>

export type SkillsPreviewProps = Readonly<{
  skills: PublicSkill[]
  className?: string
}>
