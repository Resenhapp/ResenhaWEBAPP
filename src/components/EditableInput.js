import React from 'react';

const EditableInput = ({prevContent, }) => {
    return (
        <div>
            <input
            className='bg-purpleT2 p-2 placeholder-purpleT4 rounded-lg ring-2 ring-inset ring-purpleT3 text-whiteT1'
            placeholder='Teste'
            >
            </input>
        </div>
    )
}

export default EditableInput;