'use client'
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import MyParty from '@/src/components/MyParty';

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
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <section className="flex content-center justify-center flex-col items-center w-full mt-8 h-fit max-w-md p-4">
                    <div className=' h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2 className='text-left'>Suas resenhas</h2>
                                <OutlinedButton icon={'arrow'} label={'ver todas'} action={() => handleNavigation('resenhas/todas')} />
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <MyEventsBanner eventName={'Festa do João'} eventImage={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} eventDate={'25 de maio'} eventHour={'21'} eventGuests={'10'} eventMax={'100'} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 w-[80%] mt-8 items-center justify-center content-center">
                        <Button label={'Nova Resenha'} icon={'plus'} action={() => handleNavigation('novaresenha')} iconSide='right' height={1} width={1} textAlign='center' />
                    </div>
                </section>
                <section className="flex flex-start min-h-fit h-fit items-center w-full max-w-md p-4">
                    <div className='w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2 className='w-full text-left'>Resenhas que você vai</h2>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <div class="bg-scroll h-[55vh] flex flex-col gap-4 w-full overflow-y-auto">
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                    <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}
