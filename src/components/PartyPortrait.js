import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const PartyPortrait = ({ partyName, partyImage, partyDate, partyHour, partyGuests, partyMaxGuests }) => {

    const baseFlexClasses = 'flex flex-row items-center gap-1';
    const h3Classes = 'text-[12px]';

    return (
        <div className='bg-purpleT2 rounded-2xl p-3 flex flex-row ring-2 ring-inset ring-purpleT4'>
            <Image src={partyImage} alt="" width={110} height={30} className="mr-2 rounded-lg w-28 h-28 object-cover" />
            <div className='flex flex-col w-full justify-around'>
                <h1 className='text-xl font-bold'>
                    {partyName}
                </h1>
                <div>
                    <div className={baseFlexClasses}>
                        <Vector vectorname={'calendar01'} />
                        <h3 className={h3Classes}>{partyDate}, às {partyHour}</h3>
                    </div>
                    <div className={baseFlexClasses}>
                        <Vector vectorname={'user01'} />
                        <h3 className={h3Classes}>{partyGuests}/{partyMaxGuests} confirmados</h3>
                    </div>
                </div>
                <div className='flex flex-row  justify-between'>
                    <div className='gap-2 flex'> {/* view */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'magnifier01'} />
                        </button> {/* edit */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'pencil01'} />
                        </button> {/* copy */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'copy01'} />
                        </button> {/* copy link */}
                    </div>
                    <button className='bg-redT2 flex ring-redT4 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'trash01'} />
                    </button> {/* delete */}
                </div>
            </div>
        </div>
    );
};

export default PartyPortrait;