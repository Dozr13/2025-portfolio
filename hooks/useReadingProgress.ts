import { useEffect, useState } from "react"

export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.min((top / Math.max(h, 1)) * 100, 100))
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}