import { Icon } from "@/components/ui/icon"

interface CacheIndicatorProps {
  isFromCache: boolean
  className?: string
}

export const CacheIndicator = ({ isFromCache, className = "" }: CacheIndicatorProps) => {
  if (!isFromCache) return null

  return (
    <div className={`inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 ${className}`}>
      <Icon name="zap" size="sm" className="w-3 h-3" />
      <span>Cached</span>
    </div>
  )
}