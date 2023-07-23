import React from 'react';
import RoundButton from './RoundButton';
import Vector from './Vector';

const MyInvitesBanner = ({ eventName, eventDate, eventHour, token, eventImage, eventCode }) => {
    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/${pageToGo}`;
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className="relative z-1 flex flex-row items-end w-full justify-between h-[40vh] ring-1 ring-inset bg-gradient-to-t from-purpleT0 ring-whiteT1 rounded-2xl">
                <div className='w-full absolute h-full p-2 flex flex-row-reverse'>
                    <button onClick={() => handleNavigation('resenhas/convites/')}
                        className='w-fit h-fit py-1 gap-2 font-thin px-3 rounded-full ring-1 ring-inset ring-whiteT1 flex flex-row justify-center items-center 
                    content-center backdrop-blur-xl bg-[#0000004D]'>Ver todos <Vector vectorname={'arrowRight05'} /></button>
                </div>
                <img src={eventImage} className='absolute top-0 left-0 rounded-2xl z-[-1] object-cover w-full h-full' alt='invite banner' />
                <div className='p-4'>
                    <h1 className="font-bold text-xl text-white">{eventName}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                        <Vector vectorname={'calendar04'} />
                        <h2 className='text-sm font-thin text-white'>{eventDate}, às {eventHour}h</h2>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <Vector vectorname={'qr01'} />
                        <h2 className="text-sm font-thin text-white">{token}</h2>
                    </div>
                </div>
                <div className='p-4 z-[1]'>
                    <RoundButton icon="chat" onClick={() => {handleNavigation("chat?r="+eventCode)}} />
                </div>
            </div>
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-[1px] border-r-[1px] border-l-[1px] border-purpleT4 w-[90%]
             bg-gradient-to-t from-purpleT1 to-purpleT0 rounded-b-3xl" />
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-[1px] border-r-[1px] border-l-[1px] border-purpleT3 w-[80%]
             bg-gradient-to-t from-purpleT1 to-purpleT0 rounded-b-3xl" />
        </div>
    );
};

export default MyInvitesBanner;