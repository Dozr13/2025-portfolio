import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Briefcase,
  Calendar,
  ChartBar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  Code,
  Code2,
  Container,
  Database,
  Download,
  ExternalLink,
  Eye,
  Figma,
  FileText,
  Folder,
  GitBranch,
  Github,
  Heart,
  Inbox,
  Layers,
  Layers3,
  LayoutDashboard,
  Linkedin,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Paintbrush,
  Palette,
  Phone,
  Plus,
  RefreshCcw,
  Rocket,
  Search,
  Send,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  SquarePen,
  Sun,
  Trash2,
  Triangle,
  User,
  Users,
  Workflow,
  X,
  Zap,
  type LucideIcon,
  type LucideProps
} from "lucide-react"
import { forwardRef } from "react"

// Icon registry for type safety and centralized management
const iconRegistry = {
  "alert-circle": AlertCircle,
  api: Code, // REST APIs icon
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  atom: Atom,
  "book-open": BookOpen,
  briefcase: Briefcase,
  calendar: Calendar,
  "chart-bar": ChartBar,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  clock: Clock,
  cloud: Cloud,
  code: Code,
  "code-2": Code2,
  container: Container,
  database: Database,
  download: Download,
  "external-link": ExternalLink,
  eye: Eye,
  figma: Figma,
  "file-text": FileText,
  "folder": Folder,
  "git-branch": GitBranch,
  github: Github,
  heart: Heart,
  inbox: Inbox,
  "layout-dashboard": LayoutDashboard,
  layers: Layers,
  "layers-3": Layers3,
  linkedin: Linkedin,
  loader: Loader2,
  lock: Lock,
  "log-out": LogOut,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  paintbrush: Paintbrush,
  palette: Palette,
  phone: Phone,
  plus: Plus,
  refresh: RefreshCcw,
  rocket: Rocket,
  search: Search,
  send: Send,
  server: Server,
  "share-2": Share2,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  "square-pen": SquarePen,
  sun: Sun,
  "trash-2": Trash2,
  triangle: Triangle,
  user: User,
  users: Users,
  workflow: Workflow,
  x: X,
  zap: Zap,
} as const

// Type-safe icon names
export type IconName = keyof typeof iconRegistry

// Size variants for consistent sizing
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// Accessibility labels for each icon
const iconLabels: Record<IconName, string> = {
  "alert-circle": "Alert",
  api: "REST API",
  "arrow-left": "Arrow left",
  "arrow-right": "Arrow right",
  atom: "React",
  "book-open": "BookOpen",
  briefcase: "Work experience",
  calendar: "Calendar",
  "chart-bar": "Analytics",
  "check-circle": "Success",
  "chevron-down": "Expand menu",
  "chevron-up": "Collapse menu",
  clock: "Time",
  cloud: "Cloud platform",
  code: "Code",
  "code-2": "JavaScript",
  container: "Docker container",
  database: "Database",
  download: "Download",
  "external-link": "Open external link",
  eye: "View count",
  figma: "Figma design",
  "file-text": "Article",
  "folder": "Folder",
  "git-branch": "Git version control",
  github: "GitHub profile",
  heart: "Favorite",
  inbox: "Inbox",
  "layout-dashboard": "Dashboard",
  layers: "Layers",
  "layers-3": "Prisma ORM",
  linkedin: "LinkedIn profile",
  loader: "Loading",
  lock: "Lock",
  "log-out": "Logout",
  mail: "Email",
  "map-pin": "Location",
  menu: "Open menu",
  monitor: "Monitor",
  moon: "Dark mode",
  paintbrush: "UI/UX Design",
  palette: "Design tools",
  phone: "Phone",
  plus: "Add",
  refresh: "Refresh",
  rocket: "Performance",
  search: "Search",
  send: "Send message",
  server: "Server backend",
  "share-2": "GraphQL",
  "shield-check": "Security",
  smartphone: "Mobile app",
  "square-pen": "Edit",
  sun: "Light mode",
  "trash-2": "Delete",
  triangle: "Next.js framework",
  user: "User",
  users: "Team",
  workflow: "CI/CD pipeline",
  x: "Close",
  zap: "Fast performance",
}

// Size mapping for consistent scaling
const sizeMap: Record<IconSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
}

export interface IconProps extends Omit<LucideProps, "size"> {
  /** The name of the icon to render */
  name: IconName
  /** Size variant for consistent scaling */
  size?: IconSize
  /** Custom aria-label (overrides default) */
  "aria-label"?: string
  /** Whether the icon is decorative (hides from screen readers) */
  decorative?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * A reusable, type-safe icon component built on top of Lucide React
 * 
 * Features:
 * - Type-safe icon names with autocomplete
 * - Consistent sizing system
 * - Built-in accessibility
 * - Performance optimized with tree-shaking
 * - Semantic HTML with proper ARIA attributes
 * 
 * @example
 * ```tsx
 * <Icon name="github" size="lg" />
 * <Icon name="mail" size="sm" className="text-blue-500" />
 * <Icon name="heart" decorative />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "md",
      className,
      "aria-label": ariaLabel,
      decorative = false,
      ...props
    },
    ref
  ) => {
    const IconComponent = iconRegistry[name] as LucideIcon
    const sizeClasses = sizeMap[size]

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry, using fallback`)
      // Use a generic code icon as fallback
      return (
        <Code
          ref={ref}
          className={cn(sizeClasses, className)}
          aria-label={decorative ? undefined : ariaLabel || `Unknown icon: ${name}`}
          aria-hidden={decorative}
          role={decorative ? "presentation" : undefined}
          {...props}
        />
      )
    }

    const defaultLabel = iconLabels[name]

    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClasses, className)}
        aria-label={decorative ? undefined : ariaLabel || defaultLabel}
        aria-hidden={decorative}
        role={decorative ? "presentation" : undefined}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"

// Export utility functions for advanced use cases
export const getIconComponent = (name: IconName): LucideIcon | null => {
  return iconRegistry[name] || null
}

export const getIconLabel = (name: IconName): string => {
  return iconLabels[name] || name
}

export const getAllIconNames = (): IconName[] => {
  return Object.keys(iconRegistry) as IconName[]
} 