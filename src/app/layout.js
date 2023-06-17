import '@/styles/globals.css';


export const metadata = {
  title: 'Resenha.app',
  description: 'Venha fazer suas resenhas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-purpleT1 w-screen min-h-full h-fit text-whiteT1'>
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-0 top-[-50]' />
        <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect fixed z-[-1] left-[220px] top-[256px]' />
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-[-50px] top-[656px]' />
        {children}
      </body>

    </html>
  )
}
