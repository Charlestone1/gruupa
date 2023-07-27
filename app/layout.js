import './globals.css'
// import { Inter } from 'next/font/google'
import { Open_Sans } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'TEAMLINK',
  description: 'Team grouping made easy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>{children}</body>
    </html>
  )
}
