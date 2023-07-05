import React from 'react';
import Vector from './Vector';

const FilterButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className='px-2 py-1 gap-2 flex flex-row items-center content-center'>
            Filtrar
            <Vector vectorname={'filter01'} />
        </button>
    )
}

export default FilterButton;