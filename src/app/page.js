'use client'

import Image from "next/image";
import Vector from "../components/Vector";
import page1 from '@/assets/images/page1.png';
import page2 from '@/assets/images/page2.png';
import page3 from '@/assets/images/page3.png';
import page4 from '@/assets/images/page4.png';
import page5 from '@/assets/images/page5.png';
import page1_desktop from '@/assets/images/page1_desktop.png';
import page2_desktop from '@/assets/images/page2_desktop.png';
import page3_desktop from '@/assets/images/page3_desktop.png';
import page4_desktop from '@/assets/images/page4_desktop.png';
import page5_desktop from '@/assets/images/page5_desktop.png';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="">
      <div className=' h-screen w-screen'>
        <nav className='w-full h-fit p-10 flex flex-row justify-between absolute'>
          <Vector vectorname={'thunder07'} />
          <button onClick={() => setSidebarOpen(true)} className=''>
            <Vector vectorname={'burguer02'} />
          </button>
        </nav>
        <section>
          <Image
            src={isDesktop ? page1_desktop : page1}
            width={isDesktop ? 2740 : 1080}
            height={isDesktop ? 1540 : 1920}
            alt='background'
            className='w-full h-screen object-cover z-0 max-w-[1500px]'
          />
        </section>
        <section>
          <Image
            src={isDesktop ? page2_desktop : page2}
            width={isDesktop ? 2740 : 1080}
            height={isDesktop ? 1540 : 1920}
            alt='background'
            className='w-full h-screen object-cover z-0 mt-[-1px] max-w-[1500px]'
          />
        </section>
        <section>
          <Image
            src={isDesktop ? page3_desktop : page3}
            width={isDesktop ? 2740 : 1080}
            height={isDesktop ? 1540 : 1920}
            alt='background'
            className='w-full h-screen object-cover z-0 mt-[-1px] max-w-[1500px]'
          />
        </section>
        <section>
          <Image
            src={isDesktop ? page4_desktop : page4}
            width={isDesktop ? 2740 : 1080}
            height={isDesktop ? 1540 : 1920}
            alt='background'
            className='w-full h-screen object-cover z-0 mt-[-1px] max-w-[1500px]'
          />
        </section>
        <section className='relative'>
          <Image
            src={isDesktop ? page5_desktop : page5}
            width={isDesktop ? 2740 : 1080}
            height={isDesktop ? 1540 : 1920}
            alt='background'
            className='w-full h-screen object-cover z-0 mt-[-1px] max-w-[1500px]'
          />
          <button className='absolute z-4 bg-purpleT3 hover-bg-purpleT2 left-[15%] px-24 rounded-xl truncate py-8 bottom-72' onClick={() => window.location.href = 'https://resenha.app/cadastro'}>Criar conta</button>
          <footer className='absolute bottom-0 mb-12'>
            <p className='absolute bottom-0 w-screen text-center text-sm'>Resenha.app® 2023 - Todos os direitos reservados.</p>
          </footer>
        </section>

        {/* Overlay */}
        <div className={`fixed inset-0 bg-black transition-opacity ${sidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'} z-20`} />

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 w-full bg-purpleT0 max-w-md z-30 transform transition-transform ease-in-out duration-500 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col py-20 px-4 flex-start gap-8 mt-12'>
            <button onClick={() => window.location.href = 'https://resenha.app/cadastro'} className='text-2xl px-8 py-2 text-purpleT4 rounded-xl'>Criar conta</button>
            <button onClick={() => window.location.href = 'https://resenha.app/login'} className='text-2xl px-8 py-2 text-purpleT4 rounded-xl'>Fazer login</button>
          </div>
          <div className='absolute top-0 left-0 p-8'>
            <button onClick={() => setSidebarOpen(false)}>
              <Vector vectorname={'xmark02'} />
            </button>
          </div>
          {/* Add your sidebar content here */}
        </div>
      </div>
    </main>
  );
}
