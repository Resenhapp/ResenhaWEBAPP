import React from 'react';
import RoundButton from './RoundButton';
import Vector from './Vector';

const PartyBanner = ({ eventName, eventGuests, eventMax, eventImage, eventPrice}) => {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };
    return (
        <div className='flex flex-col items-center'>
            <div className="relative z-1 flex flex-row items-end w-full justify-between h-[29vh] ring-1 ring-inset bg-gradient-to-t from-purpleT0 ring-whiteT1 rounded-2xl">
                <div className='w-full absolute h-full p-2 flex flex-row-reverse'>
                    <button onClick={() => handleNavigation('resenhas/convites/')} className='w-fit h-fit py-1 gap-2 font-thin px-3 rounded-full ring-1 ring-inset ring-whiteT1 flex flex-row justify-center items-center content-center backdrop-blur-xl bg-[#0000004D]'><Vector vectorname={'arrowRight05'}/></button>
                </div>
                <img src={eventImage} className='absolute top-0 left-0 rounded-2xl z-[-1] object-cover w-full h-full' />
                <div className='p-4'>
                    <h1 className="font-bold text-xl text-white">{eventName}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                        <h2 className="text-sm font-thin text-white">{eventGuests}/{eventMax} confirmados</h2>
                    </div>
                </div>
                <div className='p-4 z-[1]'>
                    <div className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                        <h1 className="text-purpleT2 text-center font-bold">
                            <span className="mr-1">R$</span>{eventPrice}
                        </h1>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default PartyBanner;