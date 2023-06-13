import '@/styles/globals.css';


export const metadata = {
  title: 'Resenha.app',
  description: 'Venha fazer suas resenhas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-purpleT1 w-screen min-h-full h-fit text-whiteT1'>
          {children}
      </body>
    </html>
  )
}
