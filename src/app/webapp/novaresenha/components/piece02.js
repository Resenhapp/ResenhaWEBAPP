import React, { useState } from 'react';
import DateScroll from '@/src/components/DateScroll';
import Vector from '@/src/components/Vector';
import EventHour from '@/src/components/EventHourModule';
import Toggle from '@/src/components/Toggle';

const Piece02 = ({ }) => {
    const [hasEnd, setHasEnd] = useState(true);

    const handleToggleChange = () => {
        setHasEnd(!hasEnd);
    };

    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 2);
      
      const lateTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

    return (
        <div className="w-full flex flex-col h-fit gap-6">
            <div className="flex flex-row flex-end">
                <button className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-4 py-2 rounded-full ring-2 ring-inset ring-purpleT4">
                    <Vector vectorname={'calendar03'} />
                    <h1>Escolha uma data</h1>
                </button>
            </div>
            <DateScroll currentDate={'X'} daysToShow={'x'} selectedDate={'x'} />
            <hr className='bg-purpleT4 h-[2px] border-none rounded-full' />
            <div className='flex flex-col gap-2'>
                <EventHour hasEnd={hasEnd} placeHolderStart={currentTime} placeHolderEnd={lateTime}/>
                <Toggle
                    labelText={'Não tem hora pra acabar'}
                    questionAction={''}
                    showLabel={true}
                    showQuestion={false}
                    startToggled={!hasEnd}
                    textColor={'white'}
                    onToggle={handleToggleChange}
                />
            </div>
        </div>
    );
};

export default Piece02;
