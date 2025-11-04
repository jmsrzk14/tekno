import './globals.css'
import Navigation from '@/components/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TravelAI - Jelajahi Keindahan Alam dengan AI',
  description: 'Platform perjalanan berbasis AI untuk pengalaman wisata yang tak terlupakan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navigation />
        {children}
      </body>
    </html>
  )
}