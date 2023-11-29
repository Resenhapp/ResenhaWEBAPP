import React, { useState, useEffect, useRef } from 'react';
import InputField from '@/src/components/InputField';
import Toggle from '@/src/components/Toggle';
import { Loader } from "@googlemaps/js-api-loader";
import axios from 'axios';
import qs from 'qs';

const Piece01 = ({ onNameFieldChange, onAddressFieldChange, onToggleChange, filled }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [maiority, setToggleValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const ref = React.createRef();

    useEffect(() => {
        const loader = new Loader({
          apiKey: "AIzaSyBXZTVLMeQG7r8t1NvyV9dtmNarY7WxrH8",
          libraries: ["places"]
        });
    
        loader.importLibrary().then(() => {
          const input = addressInputRef.current;
    
          if (input) {
            const autocomplete = new window.google.maps.places.Autocomplete(input);
    
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              if (!place.geometry || !place.geometry.location) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
              }
              setAddress(place.formatted_address || '');
            });
    
            input.addEventListener('input', () => {
              const inputText = input.value;
              const autocompleteService = new window.google.maps.places.AutocompleteService();
    
              autocompleteService.getPlacePredictions(
                { input: inputText },
                (predictions, status) => {
                  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setSuggestions(predictions.map((prediction) => prediction.description));
                  } else {
                    console.error('Error fetching suggestions:', status);
                    setSuggestions([]);
                  }
                }
              );
            });
          } else {
            console.error('Element with ID "pac-input" not found.');
          }
        });
      }, []); 

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

        if (!isChecked) {
            setToggleValue(!isChecked);
            onToggleChange(!isChecked);
        }
    };

    useEffect(() => {
        if (name && address) {
            filled(true);
        } else {
            filled(false);
        }
    }, [name, address, filled]);

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        } catch (error) {
            throw new Error(`Request failed: ${error}`);
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
            <div>
            <InputField
                ref={ref}
                action={handleAddressFieldChange}
                Icon='pin'
                showIcon={true}
                placeholder='Endereço'
                value={address}
                Required={true}
            />
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>
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