import '@/styles/globals.css';
import React from 'react';

export const metadata = {
  title: "Resenha.app",
  description: "Venha viver experiências incríveis!"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR" className='h-full'>
      <head>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>

<meta name="pwa-demo" content="pwa-demo" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="pwa-demo" />
<meta name="description" content="pwa-demo" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="shortcut icon" href="/favicon.ico" />
              </head>
      <body className='bg-purpleT0 overflow-x-hidden w-screen min-h-screenh-fit text-whiteT1'>
          <div className='opacity-100 scale-0 absolute'>
          <div className="bg-blackT1" />
          <div className="bg-blackT2" />
          <div className="bg-blueT1" />
          <div className="bg-blueT2" />
          <div className="bg-blueT3" />
          <div className="bg-blueT4" />
          <div className="bg-blueT5" />
          <div className="bg-grayT0" />
          <div className="bg-greenT1" />
          <div className="bg-greenT2" />
          <div className="bg-greenT3" />
          <div className="bg-greenT4" />
          <div className="bg-greenT5" />
          <div className="bg-orangeT1" />
          <div className="bg-orangeT2" />
          <div className="bg-orangeT3" />
          <div className="bg-orangeT4" />
          <div className="bg-orangeT5" />
          <div className="bg-purpleT0" />
          <div className="bg-purpleT1" />
          <div className="bg-purpleT01" />
          <div className="bg-purpleT2" />
          <div className="bg-purpleT3" />
          <div className="bg-purpleT4" />
          <div className="bg-purpleT5" />
          <div className="bg-redT1" />
          <div className="bg-redT2" />
          <div className="bg-redT3" />
          <div className="bg-redT4" />
          <div className="bg-redT5" />
          <div className="bg-whiteT1" />
          <div className="bg-whiteT2" />
          <div className="bg-yellowT1" />
          <div className="bg-yellowT2" />
          <div className="bg-yellowT3" />
          <div className="bg-yellowT4" />
          <div className="bg-yellowT5" />
          <div className="bg-altPurpleT1" />
          <div className="bg-altPurpleT2" />
          <div className="bg-altPurpleT3" />
          <div className="bg-altPurpleT4" />
          <div className="bg-altPurpleT5" />
          <div className="bg-pinkT1" />
          <div className="bg-pinkT2" />
          <div className="bg-pinkT3" />
          <div className="bg-pinkT4" />
          <div className="bg-pinkT5" />
        </div>
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-0 top-[-50]' />
        <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect fixed z-[-1] left-[220px] top-[256px]' />
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-[-50px] top-[656px]' />
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-[1600px] top-[-50]' />
        <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect fixed z-[-1] left-[920px] top-[256px]' />
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-[920px] top-[656px]' />
        <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect fixed z-[-1] left-[-600px] top-[656px]' />
        {children}
      </body>
    </html>
  )
}