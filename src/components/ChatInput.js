import React from 'react';
import Vector from './Vector';

const ChatInput = () => {
    return (
        <div className='flex flex-row bg-whiteT1 items-center p-4 gap-2 rounded-xl'>
            <input className='w-full bg-transparent text-purpleT1' placeholder='Diga alguma coisa'></input>
            <button>
                <Vector vectorname={'send01'} />
            </button>
        </div>
    )
}

export default ChatInput;