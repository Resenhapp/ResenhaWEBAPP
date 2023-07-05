import React, { useState } from 'react';
import Vector from './Vector';

const ChatInput = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        if(inputValue.trim() !== ''){
            if(onSendMessage){
                onSendMessage(inputValue);
            }
            setInputValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    return (
        <div className='flex flex-row bg-whiteT1 items-center p-4 gap-2 rounded-xl'>
            <input 
                className='w-full bg-transparent text-purpleT1' 
                placeholder='Diga alguma coisa'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleButtonClick}>
                <Vector vectorname={'send01'} />
            </button>
        </div>
    )
}

export default ChatInput;