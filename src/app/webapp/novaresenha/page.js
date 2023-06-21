'use client'
import React, { useState } from 'react';
import ProgressBar from '@/src/components/ProgressBar';
import Vector from '@/src/components/Vector';
import InputField from '@/src/components/InputField';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}
export default function NewEvent() {
    return (
        <div className='flex flex-col justify-around w-screen h-screen'>
            <div className='w-full gap-4 justify-center align-center flex flex-col content-center py-8 px-4'>
                <h1 className='text-[49px] leading-[50px] scale-95 items-center font-bold text-center'>Vamos criar uma resenha?</h1>
                <p className='text-center leading-[30px] text-[23px]'>Primeiro, comece dando um <b>nome</b> para a sua resenha e defina o lugar <b>onde ela vai acontecer:</b></p>
            </div>
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <section className="flex content-center justify-center flex-col items-center w-full mt-8 h-fit max-w-md p-4">

                    <div className='w-full flex flex-col'>
                        <InputField Icon={'thunder'} showIcon={true} placeholder={'Nome da resenha'}/>
                        <InputField Icon={'pin'} showIcon={true} placeholder={'Endereço'}/>
                    </div>
                </section>
                <div className='pb-12 w-full'>
                    <ProgressBar barAmount={5} barDone={1} />
                </div>
            </div>
        </div>
    )
}