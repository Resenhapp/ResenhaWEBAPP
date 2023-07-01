import React from 'react';

const ModalButton = ({ label, action }) => {
    return (
        <button 
            className='bg-purpleT2 ring-2 ring-purpleT3 rounded-full w-full ring-inset py-2 px-4' 
            onClick={action}
        >
            {label}
        </button>
    );
};

export default ModalButton;
