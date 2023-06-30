import Header from '@/components/Header/Header'
import '../styles/globals.scss'
import { Nunito } from 'next/font/google'

const font = Nunito({
  subsets: ['latin'],
  style: 'normal'
})

export const metadata = {
  title: 'Field Github Repos',
  description: 'Buscador de repositórios do Github paginado',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={font.className}>
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
