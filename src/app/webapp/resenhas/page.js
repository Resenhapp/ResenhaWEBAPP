'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import DualButton from '@/src/components/DualButton';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';

export const metadata = {
    title: 'Resenha.app • Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function HomePage() {
    const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);

    const handleDisplayToggle = () => {
        setIsDisplayingEvents(!isDisplayingEvents);
    };

    const exampleNameMyEvent = "Resenha Divertida!";
    const exampleDateMyEvent = "16/09/2023";
    const exampleHourMyEvent = "20";
    const exampleGuestsMyEvent = "10";
    const exampleLimitMyEvent = "100";
    const exampleImageMyEvent = "https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png";

    const exampleNameMyInvite = "Resenha Super Divertida!";
    const exampleDateMyInvite = "14/07/2023";
    const exampleHourMyInvite = "19";
    const exampleTokenMyInvite = "4253";
    const exampleImageMyInvite = "https://resenha.app/publico/recursos/resenhas/QljskFiO.png";

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Resenhas'} />
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <div className='w-[90%] align-center mt-12 justify-between items-center flex flex-row'>
                    <DualButton leftButtonText={'Seus convites'} rightButtonText={'Suas resenhas'} onLeftClick={handleDisplayToggle} onRightClick={handleDisplayToggle} />
                </div>
                {isDisplayingEvents ?
                    <MyInvitesDisplay
                        eventName={exampleNameMyInvite}
                        eventDate={exampleDateMyInvite}
                        eventHour={exampleHourMyInvite}
                        token={exampleTokenMyInvite}
                        eventImage={exampleImageMyInvite}
                    /> :
                    <MyEventsDisplay
                        eventName={exampleNameMyEvent}
                        eventDate={exampleDateMyEvent}
                        eventGuests={exampleGuestsMyEvent}
                        eventHour={exampleHourMyEvent}
                        eventMax={exampleLimitMyEvent}
                        eventImage={exampleImageMyEvent}
                    />
                }
            </div>
        </div>
    );
}
