export const ReadingProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
    <div
      className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
)
