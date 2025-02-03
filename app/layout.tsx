import { Albert_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'

import { cn } from '@/utils/classnames'
import { QueryClientProvider } from '@/providers/query-client-provider'
import './globals.css'

const albertSans = Albert_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social media app',
  description: 'This is a practice repository for a social media app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          albertSans.className,
          'blue bg-accent flex min-h-screen flex-col items-center font-medium text-zinc-800',
        )}
      >
        <QueryClientProvider>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
