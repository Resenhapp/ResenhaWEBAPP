import React from 'react';
import DateScroll from '@/src/components/DateScroll';
import Vector from '@/src/components/Vector';

const Piece02 = ({ }) => {
    return (
        <div className='w-full flex flex-col h-fit gap-3'>
            <div className='flex flex-row flex-end'>
            <button className='flex flex-row gap-1 items-center bg-purpleT2 w-fit px-4 py-2 rounded-full ring-2 ring-inset ring-purpleT4'>
                <Vector vectorname={'calendar03'} />
                <h1>Escolha uma data</h1>
            </button>
            </div>
            <DateScroll currentDate={'X'} daysToShow={'x'} selectedDate={'x'} />
        </div>
    )
}

export default Piece02;