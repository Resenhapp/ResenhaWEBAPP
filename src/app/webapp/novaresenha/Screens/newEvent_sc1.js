'use client'
import React, { useState } from 'react';
import ProgressBar from '@/src/components/ProgressBar';
import InputField from '@/src/components/InputField';
import AddressField from '@/src/components/AddressField';
import Button from '@/src/components/Button';
import Toggle from '@/src/components/Toggle';

export const metadata = {
    title: 'Resenha.app • Nova resenha',
    description: 'Venha fazer suas resenhas!',
}

export default function NewEventSc01() {
    return (
        <div className='flex flex-col justify-around w-screen h-screen'>
            <div className='w-full gap-4 align-center flex flex-col content-center py-8 px-4'>
                <h1 className='text-[49px] leading-[50px] scale-95 items-center font-bold text-center'>Vamos criar uma resenha?</h1>
                <p className='text-center leading-[30px] text-[23px]'>Primeiro, comece dando um <b>nome</b> para a sua resenha e defina o lugar <b>onde ela vai acontecer:</b></p>
            </div>
            <div className="flex flex-col  h-full items-center justify-end px-4">
                <section className="flex h-full content-center justify-between flex-col items-center w-full mt-8 max-w-md p-4">
                    <div className='w-full flex flex-col h-fit gap-3'>
                        <InputField Icon={'thunder'} showIcon={true} placeholder={'Nome da resenha'}/>
                        <AddressField initialAddress={'Brasil'} onAddressSelect={''} placeholder={'Enderço'} />
                        <Toggle labelText={'Resenha para +18?'} questionAction={''} showLabel={true} showQuestion={false} startToggled={true} textColor={'white'} />
                    </div>
                    <div className='flex flex-row justify-between w-full'>
                        <button className='py-4 px-8'>Voltar</button>
                    <Button label={'Próximo'} icon={'arrow'} iconSide='right' height={1} width={3} textAlign='left' />
                    </div>
                </section>
                <div className='pb-12 w-full'>
                    <ProgressBar barAmount={5} barDone={1} />
                </div>
            </div>
        </div>
    )
}