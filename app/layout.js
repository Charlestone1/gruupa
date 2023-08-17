import './globals.css'
// import { Inter } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import ReduxProvider from './redux/ReduxProvider'
// import { UserProvider } from './useContexGlobal/UserContext'

// const inter = Inter({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'TEAMUP',
  description: 'Team grouping made easy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
