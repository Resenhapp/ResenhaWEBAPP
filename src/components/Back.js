'use client'
import React from 'react';
import Vector from './Vector';

const Back = ({defaultEvent}) => {
    
    const handleOnClick = () => {
        if (defaultEvent) {
            defaultEvent().then(shouldNavigate => {
                if (!shouldNavigate) {   // <-- note this change
                    window.history.back();
                }
            });
        } else {
            window.history.back();
        }
    }
    

    return (
        <button onClick={handleOnClick} className="w-14 h-14 ring-1 ring-purpleT3 bg-purpleT2 rounded-full align-center items-center flex justify-center">
            <Vector vectorname={'arrowLeft01'} />
        </button>
    );
}

export default Back;