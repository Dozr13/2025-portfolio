'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

export const useImmediateHash = (hash: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.location.hash === hash
  })

  // Ensure state is updated before paint to avoid a blank initial render
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const check = () => setMatches(window.location.hash === hash)
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [hash])

  // Fallback in environments where layout effect is deferred
  useEffect(() => {
    if (typeof window === 'undefined') return
    setMatches(window.location.hash === hash)
  }, [hash])

  return matches
}
