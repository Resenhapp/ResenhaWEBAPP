import React from 'react';

const Interest = ({ interestIndex }) => {
    const colors = ['purpleT3', 'redT3', 'orangeT3', 'blueT3', 'blueT4', 'greenT3'];
    const labels = ['Jogar no PC','Eventos','Música','Arte','Fimes','Outros'];

    const color = colors[interestIndex - 1]; // Adjust for zero-based array index
    const label = labels[interestIndex - 1]; // Adjust for zero-based array index
    
    return (
        <div className={`bg-${color} w-fit h-fit py-2 px-4 rounded-full`}>
            <h1 className='text-sm'>{label}</h1>
        </div>
    )
}

export default Interest;
