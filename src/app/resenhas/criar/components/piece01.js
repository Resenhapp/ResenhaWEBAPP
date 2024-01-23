import React, { useState, useEffect } from 'react';
import InputField from '@/src/components/InputField';
import Toggle from '@/src/components/Toggle';
import PlacesAutocomplete from '@/src/components/PlacesAutocomplete';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange, filled, isMapsLoaded, placesService }) => {
  const [name, setName] = useState('');
  const [maiority, setToggleValue] = useState(false);
  const [address, setAddress] = useState('');

  const handleNameFieldChange = (event) => {
    const value = event.target.value;
    setName(value);
    onNameFieldChange(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    onAddressFieldChange(value);
  };

  const handleToggleChange = (isChecked) => {
    setToggleValue(isChecked);
    onToggleChange(isChecked);

    if (!isChecked) {
      setToggleValue(!isChecked);
      onToggleChange(!isChecked);
    }
  };

  useEffect(() => {
    if (name) {
      filled(true);
    } else {
      filled(false);
    }
  }, [name, filled]);

  const handleAddressSelect = (location) => {
    setAddress(location.address);
    onAddressFieldChange(location.address);
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
      {placesService && (
        <PlacesAutocomplete
          setSelected={handleAddressSelect}
          action={handleAddressChange}
          Icon='pin'
          showIcon={true}
          placeholder='Endereço'
          value={address}
          Required={true}
          placesService={placesService}
        />
      )}
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
