'use client'
import React, { useState } from 'react';
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import PageHeader from '@/src/components/PageHeader';
import MyParty from '@/src/components/MyParty';
import DualButton from '@/src/components/DualButton';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';

export const metadata = {
    title: 'Resenha.app • Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function Home() {
    const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);
    
    const handleDisplayToggle = () => {
        setIsDisplayingEvents(!isDisplayingEvents);
    };
    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Resenhas'} />
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <div className='w-[90%] align-center mt-12 justify-between items-center flex flex-row'>
                    <DualButton leftButtonText={'Suas resenhas'} rightButtonText={'Seus convites'} onLeftClick={handleDisplayToggle} onRightClick={handleDisplayToggle} />
                </div>
                {isDisplayingEvents ? <MyEventsDisplay /> : <MyInvitesDisplay />}
            </div>
        </div>
    );
}
