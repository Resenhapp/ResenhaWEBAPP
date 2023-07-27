import React, { useEffect, useRef } from 'react';

const TimeSelectList = ({ range, onClick, selected }) => {
    const numbers = Array.from({ length: range }, (_, i) => i);
    const selectedRef = useRef(null);

    useEffect(() => {
        if (selectedRef.current) {
            selectedRef.current.scrollIntoView({
                behavior: "smooth", 
                block: "center",
                inline: "nearest"
            });
        }
    }, [selected]);

    return (
        <div className='flex flex-col overflow-y-auto gap-1 h-[105px]'>
            {numbers.map(num => (
                <div key={num}>
                    <button
                        ref={num === selected ? selectedRef : null}
                        onClick={() => onClick(num)}
                        className={`bg-purpleT1 px-5 py-4 w-28 text-2xl rounded-lg ring-1 ring-inset ring-purpleT2 ${num === selected ? 'bg-purpleT3 ring-purpleT4' : 'bg-purpleT1'}`}
                    >
                        {num < 10 ? '0' + num : num}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TimeSelectList;
