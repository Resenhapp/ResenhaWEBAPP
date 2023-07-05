import React from 'react';
import Vector from './Vector';

const SendMessageButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-fit h-fit py-3 items-center px-5 flex flex-row font-medium gap-2 text-whiteT1 bg-purpleT3 rounded-full shadow-md"
        >
            <Vector vectorname='message01' />
            {'Mensagem'}
        </button>
    );
}

export default SendMessageButton;