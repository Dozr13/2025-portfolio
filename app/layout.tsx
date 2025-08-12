import { PageViewTracker } from '@/components/analytics'
import { ThemeProvider } from '@/components/layout'
import { AnalyticsProvider } from '@/lib/integrations'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'Wade Pate - Full Stack Developer | Portfolio',
  description:
    'Innovative Full Stack Developer specializing in modern web technologies. View my portfolio of cutting-edge projects and get in touch for collaboration opportunities.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
    'Portfolio'
  ],
  authors: [{ name: 'Wade Pate' }],
  creator: 'Wade Pate',
  metadataBase: new URL('https://wadepate.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wadepate.vercel.app',
    title: 'Wade Pate - Full Stack Developer Portfolio',
    description: 'Innovative Full Stack Developer specializing in modern web technologies.',
    siteName: 'Wade Pate Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wade Pate - Full Stack Developer Portfolio',
    description: 'Innovative Full Stack Developer specializing in modern web technologies.',
    creator: '@wadepate'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" enableSystem>
          <AnalyticsProvider>
            <main>{children}</main>
            <Suspense fallback={null}>
              <PageViewTracker />
            </Suspense>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
