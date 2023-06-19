'use client'
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Ajuda',
    description: 'Venha fazer suas resenhas!',
}

export default function Help() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Ajuda'} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[80%] mt-8 items-center justify-center content-center">
                    <Button label={'Entrar em contato'} icon={'arrow'} action={() => handleNavigation('ajuda')} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
            </div>
        </div>

    );
}
