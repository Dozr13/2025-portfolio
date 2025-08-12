export const estimateReadingTime = (text: string, wordsPerMinute = 200): number => {
  if (!text) return 5
  const words = text
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  const minutes = Math.ceil(words / Math.max(1, wordsPerMinute))
  return Math.max(1, minutes)
}
