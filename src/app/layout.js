import '@/styles/globals.css';


export const metadata = {
  title: 'Resenha.app',
  description: 'Venha fazer suas resenhas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-purpleT1 w-screen min-h-full h-fit text-whiteT1'>
        <div className='w-40 h-40 animate-zoom-in-out animate-left-right animate-fade animate-up-down bg-transparent rounded-full moreffect fixed z-[-1] left-2 top-3' />
        <div className='w-60 h-60 animate-zoom-in-out animate-up-down animate-fade bg-transparent rounded-full moreffect fixed z-[-1] left-[220px] top-[256px]' />
        <div className='w-72 h-72 animate-zoom-in-out animate-left-right animate-fade animate-up-down bg-transparent rounded-full moreffect fixed z-[-1] left-[-50px] top-[656px]' />
        {children}
      </body>
    </html>
  )
}
