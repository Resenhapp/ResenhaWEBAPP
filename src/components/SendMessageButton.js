'use client'
import React from 'react';
import { useState } from 'react';
import Vector from './Vector';

const SendMessageButton = ({ onClick, active = false }) => {
    const [isActive, setIsActive] = useState(active);
    
    let buttonClasses = "w-fit h-fit py-3 items-center px-5 flex flex-row font-medium gap-2 text-whiteT1 rounded-full shadow-md ";
    buttonClasses += isActive ? "bg-purpleT3" : "bg-grayT0";

    return (
        <button onClick={onClick} className={buttonClasses} disabled={!isActive}>
            <Vector vectorname='message01' />
            {'Mensagem'}
        </button>
    );
}

export default SendMessageButton;
