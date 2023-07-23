'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Vector from "../components/Vector";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="">
      <div className='bg-[#5900A0] h-screen w-screen'>
        <nav className='w-full h-fit bg-[#F1F1F1] p-10 flex flex-row justify-between'>
          <Vector vectorname={'logo2'} />

          <button onClick={() => setSidebarOpen(true)}>
            <Vector vectorname={'burguer02'} />
          </button>
        </nav>
        <section>
          <div className='absolute text-[#F1F1F1] z-10 top-[40%] w-full text-center flex justify-center'>
            <div className='w-[220px] gap-4 flex flex-col'>
              <div className='flex flex-col'>
                <h1 className='text-3xl font-bold m-0'>
                  Resenha.app
                </h1>
                <h2 className='font-normal text-xl m-0'>
                  faça acontecer!
                </h2>
              </div>
              <p className='text-[12px]'>
                Viva momentos e crie memórias inesquecíveis! Com o resenha.app, <b>você sempre sabe onde vai ser!</b>
              </p>
              <div>
                <button onClick={() => window.location.href = 'https://resenha.app/cadastro'} className='bg-[#8E00FF] px-16 py-5 rounded-lg text-sm'>Faça parte!</button>
              </div>
            </div>
          </div>
          <div>
            <div className='absolute bg-black opacity-50 z-2 w-screen h-screen' />
            <Image
              src={'https://media.resenha.app/s/lp/lpbg.jpg'}
              width={280}
              height={800}
              alt='background'
              className='w-full h-screen object-cover z-0'
            />
          </div>
        </section>
        <section className='bg-F1F1F1 h-fit w-screen'></section>

        {/* Overlay */}
        <div className={`fixed inset-0 bg-black transition-opacity ${sidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'} z-20`} />

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 w-full bg-purpleT0 max-w-md z-30 transform transition-transform ease-in-out duration-500 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col py-20 px-4 flex-start gap-8 mt-12'>
          <button className='text-2xl px-8 py-2 text-purpleT4 rounded-xl'>Criar conta</button>
            <button className='text-2xl px-8 py-2 text-purpleT4 rounded-xl'>Fazer login</button>
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
  )
}
