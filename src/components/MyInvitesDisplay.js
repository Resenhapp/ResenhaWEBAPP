'use client'
import React from 'react';
import Button from './Button';
import MyInvitesBanner from './MyInvitesBanner';
const MyInvitesDisplay = ({eventName, eventDate, eventHour, token, eventImage}) => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    return (
        <section className="flex content-center justify-center flex-col items-center w-full h-fit max-w-md p-4">
            <div className=' h3 w-full flex'>
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col'>
                        <MyInvitesBanner eventName={eventName} eventImage={eventImage} eventDate={eventDate} eventHour={eventHour} token={token} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                <Button label={'Descobrir Resenhas'} icon={'arrow'} action={() => handleNavigation('feed/')} iconSide='right' height={3} width={1} textAlign='center' />
            </div>
        </section>
    )
}

export default MyInvitesDisplay;