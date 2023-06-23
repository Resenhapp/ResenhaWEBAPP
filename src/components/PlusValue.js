import React from 'react';

const PlusValue = ({ value, handleClick }) => {
    return (
        <button
            className="p-4 bg-purpleT2 ring-2 ring-inset text-xl ring-purpleT3 rounded-xl"
            onClick={() => handleClick(value)}
        >
            +R$ {value}
        </button>
    );
};

export default PlusValue;