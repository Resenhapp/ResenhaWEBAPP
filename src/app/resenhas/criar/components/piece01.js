import React, { useState, useEffect } from 'react';
import InputField from '@/src/components/InputField';
import Toggle from '@/src/components/Toggle';
import PlacesAutocomplete from '@/src/components/PlacesAutocomplete';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange, filled, placesService }) => {
  const [name, setName] = useState('');
  const [maiority, setToggleValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
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
    setSelectedLocation(location);
    if (location) {
      console.log('Latitude:', location.lat);
      console.log('Longitude:', location.lng);
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
      <PlacesAutocomplete
        setSelected={handleAddressSelect}
        action={handleAddressChange}
        Icon='pin'
        showIcon={true}
        placeholder='Endereço'
        value={address}
        Required={true}
        placesService={placesService} // Passando o serviço do Google Maps
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
