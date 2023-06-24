'use client'
import React from 'react';
import MyParty from './MyParty';
import Button from './Button';

const MyInvitesDisplay = () => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    return (
        <section className="flex flex-start min-h-fit h-fit items-center w-full max-w-md p-4">
            <div className='w-full flex'>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col'>
                        <div class="bg-scroll h-[55vh] flex flex-col gap-4 w-full overflow-y-auto">
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                            <MyParty imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} partyName={'Resenha de Los Manos'} partyDate={'26/11/2023'} partyHour={'23:00'} partyCode={'QWE249'} />
                        </div>
                    </div>
                        <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                <Button label={'Procurar Resenha'} icon={'arrow'} action={() => handleNavigation('feedresenha')} iconSide='right' height={1} width={1} textAlign='center' />
            </div>
                </div>
            </div>
        </section>
    )
}

export default MyInvitesDisplay;