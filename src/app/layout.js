import '@/styles/globals.css';


export const metadata = {
  title: 'Resenha.app',
  description: 'Venha fazer suas resenhas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-b from-purpleT1 to-purpleT2 w-full h-full text-whiteT1'>
        <div className=''>
          <div className='' />
        </div>
        <main className=''>
          {children}
        </main>
      </body>
    </html>
  )
}
