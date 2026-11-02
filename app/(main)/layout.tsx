import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StoreGate from '@/components/StoreGate'

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
      <body className="min-h-screen bg-snow text-graphite antialiased">
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8">
          <StoreGate>{children}</StoreGate>
        </main>
        <Footer />
      </body>
    </html>
  )
}
