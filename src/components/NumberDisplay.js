import React from 'react';

const NumberDisplay = ({ amount, label }) => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-xl'>
                {amount}
            </h1>
            <h1 className='font-thin text-sm text-purpleT5'>
                {label}
            </h1>
        </div>
    )
}

export default NumberDisplay;