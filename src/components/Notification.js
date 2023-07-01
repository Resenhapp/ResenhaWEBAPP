import React from 'react';

const Notification = ({ title, content }) => {
    return (
        <div className='w-full h-fit justify-between flex flex-row bg-purpleT2 p-2 rounded-xl ring-1 ring-inset ring-purpleT3'>
            <div className='bg-purpleT3 h-6 w-6 rounded-full content-center align-center justify-center flex font-bold ring-1 ring-inset ring-purpleT4 mr-2'>!</div>
            <div className='w-full'>
                <h1 className='text-lg font-bold'>{title}</h1>
                <p className='text-sm font-thin'>{content}</p>
            </div>
        </div>
    );
};

export default Notification;
