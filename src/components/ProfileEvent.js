import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const ProfileEvent = ({ partyName, partyDate, partyHour, partyGuests, partyCode, imageUrl }) => {

    const h3Classes = 'text-[12px]';
    const baseFlexClasses = 'flex flex-row items-center gap-1';

    return (
        <div className='bg-purpleT1 h-fit w-full rounded-2xl p-2 flex flex-row ring-1 ring-inset ring-purpleT3'>
            <Image src={imageUrl} alt="" width={110} height={30} className="mr-2 rounded-xl object-cover h-28 w-28" />
            <div className='flex flex-col'>
                <h1 className='text-lg font-bold'>
                    {partyName}
                </h1>
                <div className={baseFlexClasses}>
                    <Vector vectorname={'calendar04'} />
                    <p className={h3Classes}>{partyDate}, às {partyHour}</p>
                </div>
                <div className={baseFlexClasses}>
                <Vector vectorname={'user04'} />
                    <p className={h3Classes}>{partyGuests} confirmados</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileEvent;