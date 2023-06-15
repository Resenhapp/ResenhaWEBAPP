import React from 'react';
import Image from 'next/image';
import RoundButton from './RoundButton';

const MyEventsBanner = ({ eventName, eventDate, eventHour, eventGuests, eventMax, eventImage }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className="relative z-1 flex flex-row items-end w-full justify-between h-[40vh] ring-2 ring-inset bg-gradient-to-t from-purpleT3 ring-whiteT1 rounded-2xl">
                <img src={eventImage} className='absolute top-0 left-0 rounded-2xl z-[-1] object-cover w-full h-full' />
                <div className='p-4'>
                    <h1 className="font-bold text-xl text-white">{eventName}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.01802 0C3.31655 0 3.55856 0.242207 3.55856 0.540984V0.991803H6.44144V0.540984C6.44144 0.242207 6.68345 0 6.98198 0C7.28051 0 7.52252 0.242207 7.52252 0.540984V0.991803H8.46847C9.31431 0.991803 10 1.67806 10 2.52459V9.46721C10 10.3137 9.31431 11 8.46847 11H1.53153C0.685691 11 0 10.3137 0 9.46721V2.52459C0 1.67805 0.68569 0.991803 1.53153 0.991803H2.47748V0.540984C2.47748 0.242207 2.71948 0 3.01802 0ZM2.47748 2.07377H1.53153C1.28275 2.07377 1.08108 2.27561 1.08108 2.52459V3.96721H8.91892V2.52459C8.91892 2.27561 8.71724 2.07377 8.46847 2.07377H7.52252V2.52459C7.52252 2.82337 7.28051 3.06557 6.98198 3.06557C6.68345 3.06557 6.44144 2.82337 6.44144 2.52459V2.07377H3.55856V2.52459C3.55856 2.82337 3.31655 3.06557 3.01802 3.06557C2.71948 3.06557 2.47748 2.82337 2.47748 2.52459V2.07377ZM8.91892 5.04918H1.08108V9.46721C1.08108 9.71619 1.28275 9.91803 1.53153 9.91803H8.46847C8.71725 9.91803 8.91892 9.71619 8.91892 9.46721V5.04918Z" fill="white" />
                        </svg>
                        <h2 className='text-sm font-thin text-white'>{eventDate}, às {eventHour}h</h2>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.47992C3.89543 1.47992 3 2.37535 3 3.47992C3 4.58449 3.89543 5.47992 5 5.47992C6.10457 5.47992 7 4.58449 7 3.47992C7 2.37535 6.10457 1.47992 5 1.47992ZM2 3.47992C2 1.82307 3.34315 0.479919 5 0.479919C6.65685 0.479919 8 1.82307 8 3.47992C8 5.13677 6.65685 6.47992 5 6.47992C3.34315 6.47992 2 5.13677 2 3.47992ZM0.776864 8.43853C1.28345 7.83813 1.99058 7.47992 2.75 7.47992H7.25C8.00942 7.47992 8.71655 7.83813 9.22314 8.43853C9.72758 9.03639 10 9.8316 10 10.6466V11.9799C10 12.2561 9.77614 12.4799 9.5 12.4799C9.22386 12.4799 9 12.2561 9 11.9799V10.6466C9 10.0471 8.79832 9.48574 8.45884 9.0834C8.12152 8.68361 7.68406 8.47992 7.25 8.47992H2.75C2.31594 8.47992 1.87848 8.68361 1.54116 9.0834C1.20168 9.48574 1 10.0471 1 10.6466V11.9799C1 12.2561 0.776142 12.4799 0.5 12.4799C0.223858 12.4799 0 12.2561 0 11.9799V10.6466C0 9.8316 0.272425 9.03639 0.776864 8.43853Z" fill="white" />
                        </svg>
                        <h2 className="text-sm font-thin text-white">{eventGuests}/{eventMax} confirmados</h2>
                    </div>
                </div>
                <div className='p-4'>
                    <RoundButton icon={'share'} />
                </div>
            </div>
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-2 border-r-2 border-l-2 border-purpleT4 w-[90%] bg-gradient-to-t from-purpleT1 rounded-b-3xl" />
            <div className="z-0 bottom-4 flex flex-row items-end justify-between h-3 border-b-2 border-r-2 border-l-2 border-purpleT3 w-[80%] bg-gradient-to-t from-purpleT1 rounded-b-3xl" />
        </div>
    );
};

export default MyEventsBanner;