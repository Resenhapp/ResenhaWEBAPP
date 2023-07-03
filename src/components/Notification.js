import React from 'react';
import Vector from './Vector';
const Notification = ({ title, content }) => {
    return (
        <div className='w-full h-fit justify-between flex flex-row bg-purpleT1 p-2 rounded-xl ring-1 ring-inset ring-purpleT3'>
            <div className='w-full'>
                <h1 className='text-lg font-bold'>{title}</h1>
                <p className='text-sm font-thin'>{content}</p>
            </div>
        </div>
    );
};

export default Notification;
