import React, { useState, useEffect } from 'react';
import InputField from '@/src/components/InputField';
import Toggle from '@/src/components/Toggle';
import PlacesAutocomplete from '@/src/components/PlacesAutocomplete';
import { Loader } from '@googlemaps/js-api-loader';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange, filled }) => {
  const [name, setName] = useState('');
  const [maiority, setToggleValue] = useState('');
  const [address, setAddress] = useState('');
  const [placesService, setPlacesService] = useState(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.importLibrary('places')
      .then(() => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        setPlacesService(service);
        setIsMapsLoaded(true);
      }).catch(() => { setIsMapsLoaded(false); });
  }, []);

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

  if (!isMapsLoaded) {
    return <div>Carregando...</div>;
  }

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
