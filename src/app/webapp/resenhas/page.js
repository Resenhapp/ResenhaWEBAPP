'use client'
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function Home() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Resenhas'} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Suas resenhas</h2>
                                <OutlinedButton icon={'arrow'} label={'ver todas'} action={() => handleNavigation('resenhas/todas')} />
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <MyEventsBanner eventName={'Festa do João'} eventImage={'https://media.istockphoto.com/id/1201443405/pt/foto/people-enjoying-asado-party-at-backyard.jpg?s=170667a&w=0&k=20&c=CuVxJvC6Xj9TFWsW0M7EpXHU_JwKDAwnSpQVemQ72ew='} eventDate={'25 de maio'} eventHour={'21'} eventGuests={'10'} eventMax={'100'} />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[80%] mt-8 items-center justify-center content-center">
                    <Button label={'Criar resenha'} icon={'plus'} />
                </div>
            </div>
        </div>

    );
}
