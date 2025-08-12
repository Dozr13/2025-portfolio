export const markdownToHtml = (markdown: string): string => {
  // Split into lines and process
  const lines = markdown.split('\n')
  const result: string[] = []
  let inCodeBlock = false
  let codeBlockContent: string[] = []
  let currentParagraph: string[] = []

  const processParagraph = (paragraph: string[]) => {
    if (paragraph.length === 0) return

    const text = paragraph.join(' ').trim()
    if (text === '') return

    // Check for headers
    if (text.startsWith('# ')) {
      result.push(
        `<h1 class="text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight">${text.slice(2)}</h1>`
      )
    } else if (text.startsWith('## ')) {
      result.push(
        `<h2 class="text-2xl lg:text-3xl font-semibold mb-6 mt-12 text-foreground leading-tight border-b border-border/30 pb-2">${text.slice(3)}</h2>`
      )
    } else if (text.startsWith('### ')) {
      result.push(
        `<h3 class="text-xl lg:text-2xl font-semibold mb-4 mt-8 text-foreground leading-tight">${text.slice(4)}</h3>`
      )
    } else {
      // Check for lists
      if (text.match(/^\d+\.\s/)) {
        // Ordered list
        result.push(
          `<ol class="mb-6 ml-6 space-y-2 text-lg lg:text-xl text-foreground/90"><li class="leading-relaxed">${text.replace(/^\d+\.\s/, '')}</li></ol>`
        )
      } else if (text.match(/^[-*]\s/)) {
        // Unordered list
        result.push(
          `<ul class="mb-6 ml-6 space-y-2 text-lg lg:text-xl text-foreground/90"><li class="leading-relaxed">${text.replace(/^[-*]\s/, '')}</li></ul>`
        )
      } else {
        // Regular paragraph
        result.push(
          `<p class="mb-6 leading-relaxed text-foreground/90 text-lg lg:text-xl">${text}</p>`
        )
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false
        const codeContent = codeBlockContent.join('\n')
        result.push(
          `<pre class="bg-muted/50 p-6 rounded-xl overflow-x-auto my-6 border border-border/50 shadow-lg backdrop-blur-sm"><code class="text-sm text-foreground/90 font-mono leading-relaxed">${codeContent}</code></pre>`
        )
        codeBlockContent = []
      } else {
        // Start of code block
        inCodeBlock = true
        // Process any pending paragraph
        processParagraph(currentParagraph)
        currentParagraph = []
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Handle empty lines (paragraph breaks)
    if (line.trim() === '') {
      processParagraph(currentParagraph)
      currentParagraph = []
      continue
    }

    // Check for headers (single line)
    if (line.startsWith('# ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(
        `<h1 class="text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight">${line.slice(2)}</h1>`
      )
    } else if (line.startsWith('## ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(
        `<h2 class="text-2xl lg:text-3xl font-semibold mb-6 mt-12 text-foreground leading-tight border-b border-border/30 pb-2">${line.slice(3)}</h2>`
      )
    } else if (line.startsWith('### ')) {
      processParagraph(currentParagraph)
      currentParagraph = []
      result.push(
        `<h3 class="text-xl lg:text-2xl font-semibold mb-4 mt-8 text-foreground leading-tight">${line.slice(4)}</h3>`
      )
    } else {
      // Regular text line
      currentParagraph.push(line)
    }
  }

  // Process any remaining paragraph
  processParagraph(currentParagraph)

  return result.join('\n')
}
