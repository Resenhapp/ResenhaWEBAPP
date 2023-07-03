'use client'
import React from 'react';
import Button from './Button';
import PartyBanner from './PartyBanner';

const PartyDisplay = ({eventName, eventDate, eventHour, eventGuests, eventMax, eventImage, eventPrice}) => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    
    return (
        <section className="flex content-center justify-center flex-col items-center w-full h-fit max-w-md">
            <div className='h3 w-full flex'>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col'>
                        <PartyBanner eventName={eventName} eventImage={eventImage} eventDate={eventDate} eventHour={eventHour} eventGuests={eventGuests} eventMax={eventMax} eventPrice={eventPrice} />
                    </div>
                    <div className='w-full h-full flex flex-col mt-4'>
                        <PartyBanner eventName={eventName} eventImage={eventImage} eventDate={eventDate} eventHour={eventHour} eventGuests={eventGuests} eventMax={eventMax} eventPrice={eventPrice} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartyDisplay;