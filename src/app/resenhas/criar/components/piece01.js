import React, { useState, useEffect } from 'react';
import InputField from '@/src/components/InputField';
import AddressField from '@/src/components/AddressField';
import Toggle from '@/src/components/Toggle';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange, filled }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [maiority, setToggleValue] = useState('');

    useEffect(() => {
        if (name && address) {
            filled(true);
        } else {
            filled(false);
        }
    }, [name, address, filled]);

    const handleNameFieldChange = (event) => {
        const value = event.target.value;
        setName(value);
        onNameFieldChange(value);
    };

    const handleAddressFieldChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        onAddressFieldChange(value);
    };

    const handleToggleChange = (isChecked) => {
        setToggleValue(isChecked);
        onToggleChange(isChecked);

        if (!isChecked){
            setToggleValue(!isChecked);
            onToggleChange(!isChecked);
        }
    };

    return (
        <div className='w-full flex flex-col h-fit gap-3'>
            <InputField
                action={handleNameFieldChange}
                Icon='thunder'
                showIcon={true}
                placeholder='Nome da resenha'
                value={name}
                Required={true}
            />
            <InputField
                action={handleAddressFieldChange}
                Icon='pin'
                showIcon={true}
                placeholder='Endereço'
                value={address}
                Required={true}
            />
            <Toggle
                onToggle={handleToggleChange}
                labelText='Resenha para +18?'
                showLabel={true}
                showQuestion={false}
                value={maiority}
                textColor='white'
            />
        </div>
    );
};

export default Piece01;