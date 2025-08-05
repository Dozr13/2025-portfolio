import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  ChartBar,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Folder,
  Github,
  Heart,
  Inbox,
  Linkedin,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Palette,
  Phone,
  Plus,
  Rocket,
  Send,
  ShieldCheck,
  SquarePen,
  Sun,
  Trash2,
  User,
  Users,
  X,
  type LucideIcon,
  type LucideProps
} from "lucide-react"
import { forwardRef } from "react"

// Icon registry for type safety and centralized management
const iconRegistry = {
  "alert-circle": AlertCircle,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  briefcase: Briefcase,
  calendar: Calendar,
  "chart-bar": ChartBar,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  clock: Clock,
  code: Code,
  download: Download,
  "external-link": ExternalLink,
  eye: Eye,
  "file-text": FileText,
  "folder": Folder,
  github: Github,
  heart: Heart,
  inbox: Inbox,
  linkedin: Linkedin,
  loader: Loader2,
  lock: Lock,
  "log-out": LogOut,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  palette: Palette,
  plus: Plus,
  phone: Phone,
  rocket: Rocket,
  send: Send,
  "shield-check": ShieldCheck,
  "square-pen": SquarePen,
  sun: Sun,
  "trash-2": Trash2,
  user: User,
  users: Users,
  x: X,
} as const

// Type-safe icon names
export type IconName = keyof typeof iconRegistry

// Size variants for consistent sizing
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

// Accessibility labels for each icon
const iconLabels: Record<IconName, string> = {
  "alert-circle": "Alert",
  "arrow-left": "Arrow left",
  "arrow-right": "Arrow right",
  briefcase: "Work experience",
  calendar: "Calendar",
  "chart-bar": "Analytics",
  "check-circle": "Success",
  "chevron-down": "Expand menu",
  clock: "Time",
  code: "Code",
  download: "Download",
  "external-link": "Open external link",
  eye: "View count",
  "file-text": "Article",
  "folder": "Folder",
  github: "GitHub profile",
  heart: "Favorite",
  inbox: "Inbox",
  linkedin: "LinkedIn profile",
  loader: "Loading",
  lock: "Lock",
  "log-out": "Logout",
  mail: "Email",
  "map-pin": "Location",
  menu: "Open menu",
  monitor: "Monitor",
  moon: "Dark mode",
  palette: "Design",
  plus: "Plus",
  phone: "Phone",
  rocket: "Performance",
  send: "Send message",
  "shield-check": "Shield check",
  "square-pen": "Edit",
  sun: "Light mode",
  "trash-2": "Trash",
  user: "User",
  users: "Team",
  x: "Close",
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

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`)
      return null
    }

    const sizeClasses = sizeMap[size]
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