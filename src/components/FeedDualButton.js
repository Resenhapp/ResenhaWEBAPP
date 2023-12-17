import React, { useState } from 'react';
import Vector from './Vector';
import FilterButton from './FilterButton';
const FeedDualButton = ({leftButtonText, rightButtonText, onLeftClick, onRightClick, onFilterClick}) => {
    const [isLeftActive, setIsLeftActive] = useState(true);

    const handleLeftClick = () => {
        setIsLeftActive(true);
        onLeftClick();
    };

    const handleRightClick = () => {
        setIsLeftActive(false);
        onRightClick();
    };

    return (
        <div className='w-full flex flex-row gap-2'>
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
            <FilterButton onClick={onFilterClick}/>
        </div>
    );
};

export default FeedDualButton;
