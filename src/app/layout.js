import '@/styles/globals.css';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const fetchInviteData = async () => {
  // Lógica para buscar os dados do convite
  // Substitua por sua lógica real de obtenção de dados do convite
  const inviteData = await fetchData(); 
  return inviteData;
};

export const metadata = {
  title: 'Resenha.app',
  description: 'Venha fazer suas resenhas!',
}

export default function RootLayout({ children }) {
  const [inviteData, setInviteData] = useState(null);

  useEffect(() => {
    const checkInvite = async () => {
      // Lógica para verificar se há um convite ativo
      const hasInvite = checkInvite(); // Substitua por sua lógica de verificação

      if (hasInvite) {
        // Se houver um convite ativo, busca os dados do convite
        const data = await fetchInviteData();
        setInviteData(data);
      }
    };

    checkInvite();
  }, []);

  return (
    <>
      {inviteData && (
        <Head>
          <title>{inviteData.title}</title>
          <meta property="og:title" content={inviteData.title} />
          <meta name="description" content={inviteData.description} />
          <meta property="og:description" content={inviteData.description} />
          <meta name="guests-confirmed" content={inviteData.guests.confirmed} />
          <meta name="ticket-price" content={inviteData.ticket} />
          <meta name="host-name" content={inviteData.host.name} />
          {/* Outros metadados conforme necessário */}
        </Head>
      )}
      <html lang="en" className='h-full'>
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
    
    </>
    
  );
}
