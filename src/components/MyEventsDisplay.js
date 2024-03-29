'use client'
import React from 'react';
import Button from './Button';
import MyEventsBanner from './MyEventsBanner';

const MyEventsDisplay = ({eventName, eventDate, eventHour, eventGuests, eventMax, eventImage, eventCode, openParty}) => {
    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };
    
    return (
        <section className="flex content-center justify-center flex-col items-center w-full h-fit max-w-md p-4">
            <div className=' h3 w-full flex'>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col' onClick={openParty}>
                        <MyEventsBanner eventName={eventName} eventImage={eventImage} eventDate={eventDate} eventHour={eventHour} eventGuests={eventGuests} eventMax={eventMax} eventCode={eventCode} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                <Button label={'Nova resenha'} icon={'plus'} action={() => handleNavigation('resenhas/criar/')} iconSide='right' height={1} width={1} textAlign='center' />
            </div>
        </section>
    )
}

export default MyEventsDisplay;