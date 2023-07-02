import React from 'react';
import Vector from './Vector';
const EditButton = ({ content, onClick }) => {
    return (
        <button onClick={onClick} className='w-fit h-fit py-3 px-5 flex flex-row font-medium gap-4 text-purpleT3 bg-whiteT1 rounded-full ring-1 ring-whiteT2 shadow-md'>
            <Vector vectorname={'edit01'} />
            {content}
        </button>
    )
}

export default EditButton;