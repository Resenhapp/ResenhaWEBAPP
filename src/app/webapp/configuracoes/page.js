'use client'
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import React from 'react';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}

export default function Settings() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Configurações'} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 flex flex-col'>
                                <Button label={'Conta'} icon={'user'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Segurança'} icon={'shield'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Privacidade'} icon={'lock'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Pagamentos'} icon={'money'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Notificações'} icon={'bell'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
