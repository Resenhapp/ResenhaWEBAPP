import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const BlockedUserNotification = ({ title, description, hour, date, imageUrl, sbutton = false, onButtonClick }) => {

    const h3Classes = 'text-[12px]';
    const h4Classes = 'text-[10px]';
    const baseFlexClasses = 'flex flex-row items-center gap-1';

    const handleButton = () => {
    };

    return (
        <div className='bg-purpleT1 h-fit w-full rounded-2xl p-2 flex flex-row ring-1 ring-inset ring-purpleT3'>
            <Image src={imageUrl} alt="" width={110} height={30} className="mr-2 rounded-xl object-cover h-28 w-28" />
            <div className='flex flex-col'>
                <h1 className='text-lg font-bold'>
                    {title}
                </h1>
                <div className={baseFlexClasses}>
                    <p className={h3Classes}>{description}</p>
                </div>
                <div className='flex flex-row justify-between items-end mt-auto'>
                    <p className={h4Classes}>{date} • {hour}</p>
                    {sbutton && (
                        <button
                            onClick={onButtonClick}
                            className='w-8 h-8 gap-2 font-thin rounded-full ring-1 ring-inset ring-redT4 flex justify-center items-center content-center'
                        >
                            <Vector vectorname={'xmark01'} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlockedUserNotification;