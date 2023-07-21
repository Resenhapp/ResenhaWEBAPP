'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import SessionNotification from '@/src/components/SessionNotification';

export default function SecurityHistory() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Histórico de sessões" />
            <div className="flex flex-col items-center justify-start h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-2 flex flex-col pt-4'>
                                <SessionNotification
                                    title={'Nova sessão iniciada'}
                                    description={'Detectamos um novo login utilizando as suas credenciais na região de Porto Alegre, Brasil.'}
                                    date={'Hoje'}
                                    hour={'21:34'}
                                />
                                <SessionNotification
                                    title={'Nova sessão iniciada'}
                                    description={'Detectamos um novo login utilizando as suas credenciais na região de Belém, Pará.'}
                                    date={'09 de Junho'}
                                    hour={'09:34'}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
