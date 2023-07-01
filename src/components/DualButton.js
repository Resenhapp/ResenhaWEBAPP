import React, { useState } from 'react';

const DualButton = ({leftButtonText, rightButtonText, onLeftClick, onRightClick}) => {
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
                className={`w-full ring-1 ring-whiteT1 ring-inset py-1 rounded-full ${isLeftActive ? 'bg-whiteT1 text-purpleT1' : 'bg-transparent text-whiteT1'}`}
            >
                <h1>{leftButtonText}</h1>
            </button>
            <button 
                onClick={handleRightClick}
                className={`w-full ring-1 ring-whiteT1 ring-inset py-1 rounded-full ${isLeftActive ? 'bg-transparent text-whiteT1' : 'bg-whiteT1 text-purpleT1'}`}
            >
                <h1>{rightButtonText}</h1>
            </button>
        </div>
    );
};

export default DualButton;
