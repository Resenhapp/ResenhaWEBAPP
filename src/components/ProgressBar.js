import React from 'react';

const ProgressBar = ({ barAmount, barDone }) => {
    const bars = Array.from({ length: barAmount }, (_, i) => i < barDone);
    return (
        <div className='w-full h-fit flex flex-row gap-2 rounded-full p-2'>
            {bars.map((bar, i) =>
                <div key={i} className={`h-1 w-full rounded-full ${bar ? 'bg-whiteT1' : 'bg-purpleT3'}`} />
            )}
        </div>
    );
};

export default ProgressBar;
