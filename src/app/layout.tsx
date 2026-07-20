import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import { AppProviders } from '@/components/providers/app-providers'
import { Navbar } from '@/components/navbar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Conveo - Event Management Platform',
  description: 'A production-grade Event Management Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ClerkProvider
          appearance={{
            theme: shadcn,
            variables: {
              colorPrimary: '#8083ff',
              colorBackground: '#131313',
              colorInput: '#1c1b1b',
              colorInputForeground: '#e5e2e1',
            },
            elements: {
              card: 'bg-surface-container-low/90 backdrop-blur-xl border border-outline-variant/30 shadow-2xl rounded-2xl',
              headerTitle: 'text-on-surface font-bold text-xl tracking-tight',
              headerSubtitle: 'text-on-surface-variant text-sm',
              formButtonPrimary:
                'bg-primary hover:bg-primary-container text-on-primary font-semibold py-2.5 rounded-xl shadow-md shadow-primary/20 transition-all duration-200',
              formFieldInput:
                'bg-surface-container border border-outline-variant/40 text-on-surface focus:border-primary rounded-xl transition-all',
              footerActionLink: 'text-primary hover:underline font-medium',
              socialButtonsBlockButton:
                'border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl transition-all',
            },
          }}
        >
          <AppProviders>
            <Navbar />
            {children}
          </AppProviders>
        </ClerkProvider>
      </body>
    </html>
  )
}
