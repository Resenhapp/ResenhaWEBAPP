import React from 'react';
import Vector from './Vector';
import PartyTag from './PartyTag';
import Image from 'next/image';
import { partyData } from '@/src/components/PartyData';
import BookmarkButton from './SaveButton';

const PartyBanner = ({imageUrl, eventCode, eventName, eventGuests, eventMax, eventImage, eventPrice, eventSaved, eventTags, handleSaveButton}) => {
    

    var handleClick = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/convite/?code=${pageToGo}`;
        }
    };

    return (
        <div className='flex flex-col items-center mt-3'>
            <div className="relative z-1 flex flex-row items-end w-full justify-between h-[29vh] ring-1 ring-inset bg-gradient-to-t from-black ring-purpleT4 rounded-2xl">
                <div className='w-full absolute h-fit top-0 p-2 flex justify-between flex-row'>
                    <div className='flex flex-row w-full gap-1'>
                        {eventTags.map((index) => (
                            <div key={index.id}>
                                <PartyTag bgColor={partyData[index].bgColor} icon={partyData[index].icon} special={partyData[index].special} tagname={partyData[index].tagname} />
                            </div>
                        ))
                        }
                    </div>
                    <BookmarkButton initialSavedState={handleSaveButton} />
                </div>
                <img src={eventImage} className='absolute top-0 left-0 rounded-2xl z-[-1] object-cover w-full h-full' alt='P Banner' />
                <div className='py-4 pl-4'>
                    <h1 className="font-bold text-xl text-white overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">{eventName}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='flex flex-row' onClick={() => handleClick(eventCode)}>
                            {imageUrl.map((url, index) => (
                                <div key={index.id}>
                                    <Image
                                        key={index}
                                        src={url}
                                        alt=""
                                        width={110}
                                        height={30}
                                        className={`rounded-full ${index < imageUrl.length - 1 ? "mr-[-10px]" : ""} ring-2 ring-purpleT1 object-cover h-5 w-5`}
                                    />
                                </div>
                            ))}
                        </div>
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