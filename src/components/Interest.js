import React from 'react';
import Vector from './Vector';

const Interest = ({ interestIndex, isRemovable, removeEvent }) => {
    const labels = ['Jogar no PC','Eventos','Música','Arte','Fimes','Outros'];

    let className;
    switch(interestIndex) {
        case 1:
            className = "bg-purpleT3";
            break;
        case 2:
            className = "bg-redT3";
            break;
        case 3:
            className = "bg-orangeT3";
            break;
        case 4:
            className = "bg-blueT3";
            break;
        case 5:
            className = "bg-blueT4";
            break;
        case 6:
            className = "bg-greenT3";
            break;
        default:
            className = "bg-default";
            break;
    }

    const label = labels[interestIndex - 1];
    
    const handleClick = () => {
        if (isRemovable) {
            removeEvent();
        }
    }

    return (
        <button onClick={handleClick} className={`${className} w-fit flex flex-row items-center gap-1 h-fit py-2 px-4 rounded-full`}>
            {isRemovable && <Vector vectorname={'xmark01'} />}
            <h1 className='text-sm'>{label}</h1>
        </button>
    )
}

export default Interest;
