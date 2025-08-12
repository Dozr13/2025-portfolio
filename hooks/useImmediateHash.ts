"use client"

import { useEffect, useState } from "react"

export const useImmediateHash = (hash: string): boolean => {
  const [immediate, setImmediate] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    setImmediate(window.location.hash === hash)
  }, [hash])
  return immediate
}


