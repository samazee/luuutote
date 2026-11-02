import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tirilli - Ecommerce',
  description: 'Your one-stop shop for everything',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body className="min-h-screen">
        <main className="flex bg-snow mx-auto max-w-7xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
