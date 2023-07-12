import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const PartyPortrait = ({ viewOnClick, editOnClick, copyOnClick, trashOnClick, canBeDeleted = true, partyCode, partyName, partyImage, partyDate, partyHour, partyGuests, partyMaxGuests }) => {

    const baseFlexClasses = 'flex flex-row items-center gap-1';
    const h3Classes = 'text-[12px]';

    return (
        <div className='bg-purpleT1 h-fit w-full rounded-2xl p-2 flex flex-row ring-1 ring-inset ring-purpleT3'>
            <Image src={partyImage} alt="" width={110} height={30} className="mr-2 rounded-xl object-cover h-28 w-28" />
            <div className='flex flex-col w-full justify-around'>
                <h1 className='text-xl font-bold'>
                    {partyName}
                </h1>
                <div>
                    <div className={baseFlexClasses}>
                        <Vector vectorname={'calendar04'} />
                        <h3 className={h3Classes}>{partyDate}, às {partyHour}</h3>
                    </div>
                    <div className={baseFlexClasses}>
                        <Vector vectorname={'user04'} />
                        <h3 className={h3Classes}>{partyGuests}/{partyMaxGuests} confirmados</h3>
                    </div>
                </div>
                <div className='flex flex-row  justify-between'>
                    <div className='gap-2 flex'> {/* view */}
                        <button onClick={viewOnClick} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'magnifier01'} />
                        </button> {/* edit */}
                        <button onClick={editOnClick} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'pencil01'} />
                        </button> {/* copy */}
                        <button onClick={copyOnClick} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'copy01'} />
                        </button> {/* copy link */}
                    </div>
                    {canBeDeleted && 
                        <button onClick={trashOnClick} className='bg-redT2 flex ring-redT4 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'trash01'} />
                        </button> /* delete */
                    }
                </div>
            </div>
        </div>
    );
};

export default PartyPortrait;
