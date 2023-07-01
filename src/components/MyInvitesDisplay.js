'use client'
import React from 'react';
import Button from './Button';
import MyInvitesBanner from './MyInvitesBanner';
const MyInvitesDisplay = () => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    return (
        <section className="flex content-center justify-center flex-col items-center w-full h-fit max-w-md p-4">
            <div className=' h3 w-full flex'>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col'>
                        <MyInvitesBanner eventName={'Resenha Meira'} eventImage={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'} eventDate={'25 de maio'} eventHour={'21'} eventGuests={'10'} eventMax={'100'} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                <Button label={'Procurar Resenhas'} icon={'arrow'} action={() => handleNavigation('../test')} iconSide='right' height={1} width={1} textAlign='center' />
            </div>
        </section>
    )
}

export default MyInvitesDisplay;