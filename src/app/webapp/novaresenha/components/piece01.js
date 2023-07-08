import React from 'react';
import InputField from '@/src/components/InputField';
import AddressField from '@/src/components/AddressField';
import Toggle from '@/src/components/Toggle';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange }) => {
    return (
        <div className='w-full flex flex-col h-fit gap-3'>
            <InputField
                action={onNameFieldChange}
                Icon='thunder'
                showIcon={true}
                placeholder='Nome da resenha'
            />
            <InputField
                action={onAddressFieldChange}
                Icon='pin'
                showIcon={true}
                placeholder='Endereço'
            />
            <Toggle
                onToggle={onToggleChange}
                labelText='Resenha para +18?'
                showLabel={true}
                showQuestion={false}
                startToggled={true}
                textColor='white'
            />
        </div>
    )
}

export default Piece01;
