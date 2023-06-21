'use client'
import React from 'react';
import Vector from './Vector';

const NotificationsButton = ({ dotVisible, toggleNotifications }) => {
    return (
        <div className='flex flex-rom align-bottom items-end justify-end'>
            <button onClick={toggleNotifications} className="bg-purpleT2 text-whiteT1 shadow-2xl h-16 w-16 rounded-full flex justify-center ring-2 ring-purpleT3 align-center items-center">
                <Vector vectorname={'bell01'}/>
            </button>
            {dotVisible && <div className='bg-orangeT4 w-4 h-4 rounded-full ml-[-15px]' />}
        </div>
    );
};

export default NotificationsButton;
