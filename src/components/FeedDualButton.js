import React, { useState } from 'react';
import Vector from './Vector';

const FeedDualButton = ({leftButtonText, rightButtonText, onLeftClick, onRightClick}) => {
    const [isLeftActive, setIsLeftActive] = useState(true);

    const handleLeftClick = () => {
        setIsLeftActive(true);
        onLeftClick(); // Call the passed in onLeftClick prop
    };

    const handleRightClick = () => {
        setIsLeftActive(false);
        onRightClick(); // Call the passed in onRightClick prop
    };

    return (
        <div className='w-full flex flex-row gap-3'>
            <button 
                onClick={handleLeftClick}
                className={`w-full ring-whiteT1 py-3 flex rounded-full justify-center content-center items-center gap-2 ${isLeftActive ? 'bg-purpleT3 text-whiteT1' : 'bg-purpleT2 text-whiteT1'}`}
            >
                <Vector vectorname={'thunder05'} />
                <h1>{leftButtonText}</h1>
            </button>
            <button 
                onClick={handleRightClick}
                className={`w-full ring-whiteT1 py-3 flex rounded-full justify-center content-center items-center gap-2 ${isLeftActive ? 'bg-purpleT2 text-whiteT1' : 'bg-purpleT3 text-whiteT1'}`}
            >
                <Vector vectorname={'lit01'} />
                <h1>{rightButtonText}</h1>
            </button>
        </div>
    );
};

export default FeedDualButton;
