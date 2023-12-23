import React from 'react';

const SessionNotification = ({ title, description, hour, date }) => {

    const h3Classes = 'text-[12px]';
    const h4Classes = 'text-[10px]';
    const baseFlexClasses = 'flex flex-row items-center gap-1';

    const handleButton = () => {
    };

    return (
        <div className='bg-purpleT1 pl-3 h-fit w-full rounded-2xl p-2 flex flex-col ring-1 ring-inset ring-purpleT3'>
            <h1 className='text-lg font-bold'>
                {title}
            </h1>
            <div className={baseFlexClasses}>
                <p className={h3Classes}>{description}</p>
            </div>
            <div className='flex flex-row justify-between items-end mt-auto'>
                <p className={h4Classes}>{date} • {hour}</p>
            </div>
        </div>
    );
}

export default SessionNotification;