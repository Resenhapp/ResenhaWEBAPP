import React, { useState } from 'react';
import Vector from './Vector';

const Interest = ({ interestIndex, isRemovable, removeEvent, isAppend, appendEvent }) => {
    const labels = ['Gamer','Eventos','Música','Arte','Fimes','Outros', 'Anime', 'Cultura', 'Baile Funk', 'Festa Temática', 'LGBTQ+', 'Nerd', 'F1', 'Pool Party', 'Novas experiências'];
    const [isSelected, setIsSelected] = useState(false);

    let className;
    switch(interestIndex) {
        case 1:
            className = "bg-blueT3";
            break;
        case 2:
            className = "bg-redT3";
            break;
        case 3:
            className = "bg-orangeT2";
            break;
        case 4:
            className = "bg-blueT3";
            break;
        case 5:
            className = "bg-yellowT2";
            break;
        case 6:
            className = "bg-grayT0";
            break;
        case 7:
            className = "bg-redT3";
            break;
        case 8:
            className = "bg-orangeT2";
            break;
        case 9:
            className = "bg-blueT2";
            break;
        case 10:
            className = "bg-yellowT2";
            break;
        case 11:
            className = "bg-gradi font-bold text-[#ffffff]";
            break;
        case 12:
            className = "bg-blueT3";
            break;
        case 13:
            className = "bg-greenT2";
            break;
        case 14:
            className = "bg-blueT2";
            break;
        case 15:
            className = "bg-orangeT2";
            break;
        default:
            className = "bg-default";
            break;
    }

    const label = labels[interestIndex - 1];
    
    const handleClick = () => {
        if (isAppend) {
            setIsSelected(!isSelected);
            if(!isSelected) {
                appendEvent(label);
            }
        } else if (isRemovable) {
            removeEvent();
        }
    }

    return (
        <button onClick={handleClick} className={`${className} w-fit flex flex-row items-center gap-1 h-fit py-2 px-4 rounded-full ${isSelected ? 'ring-2 ring-inset ring-[#FFFFFF80]' : ''}`}>
            {(isRemovable || isAppend) && <Vector vectorname={isSelected ? 'minus01' : (isAppend ? 'plus01' : 'xmark01')} />}
            <h1 className='text-sm'>{label}</h1>
        </button>
    )
}

export default Interest;
