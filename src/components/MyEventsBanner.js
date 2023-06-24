import React from 'react';
import Image from 'next/image';
import RoundButton from './RoundButton';
import Vector from './Vector';
import OutlinedButton from './OutlinedButton';

const MyEventsBanner = ({ eventName, eventDate, eventHour, eventGuests, eventMax, eventImage }) => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    return (
        <div className='flex flex-col items-center'>
            <div className="relative z-1 flex flex-row items-end w-full justify-between h-[40vh] ring-2 ring-inset bg-gradient-to-t from-purpleT3 ring-whiteT1 rounded-2xl">
                <div className='w-full absolute h-full p-2 flex flex-row-reverse'>
                    <button onClick={() => handleNavigation('resenhas/todas/')} className='w-fit h-fit py-1 px-2 rounded-full ring-2 ring-inset ring-whiteT1 flex flex-row justify-center items-center gap-1 backdrop-blur-xl bg-[#F1F1F14D]'>Ver todas <Vector vectorname={'arrowRight02'} /></button>
                    </div>
                <img src={eventImage} className='absolute top-0 left-0 rounded-2xl z-[-1] object-cover w-full h-full' />
                <div className='p-4'>
                    <h1 className="font-bold text-xl text-white">{eventName}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                    <Vector vectorname={'calendar01'} />
                        <h2 className='text-sm font-thin text-white'>{eventDate}, às {eventHour}h</h2>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                    <Vector vectorname={'user01'} />
                        <h2 className="text-sm font-thin text-white">{eventGuests}/{eventMax} confirmados</h2>
                    </div>
                </div>
                <div className='p-4 z-[1]'>
                    <RoundButton icon={'share'} onClick={() => { console.log('Button Clicked!'); window.alert('Button clicked!')} } />
                </div>
            </div>
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-2 border-r-2 border-l-2 border-purpleT4 w-[90%] bg-gradient-to-t from-purpleT1 rounded-b-3xl" />
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-2 border-r-2 border-l-2 border-purpleT3 w-[80%] bg-gradient-to-t from-purpleT1 rounded-b-3xl" />
        </div>
    );
};

export default MyEventsBanner;