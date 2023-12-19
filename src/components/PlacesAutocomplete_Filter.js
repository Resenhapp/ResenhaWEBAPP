import React, { useState, useEffect } from "react";
import Vector from './Vector';
import usePlacesAutocomplete, {
    getGeocode
  } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete_Filter = ({ setSelected, placeholder, defaultValue }) => {
  const [placesService, setPlacesService] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  useEffect(() => {
    const initializePlacesService = () => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      setPlacesService(service);
    };
    initializePlacesService();
  }, []);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    placesService,
    cacheKey: 'br',
    requestOptions: {
      componentRestrictions: { country: 'br' }, // Restrição para o Brasil (código de país ISO 3166-1 alfa-2)
      types: ['address']
    },
  });

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, setValue]);
  
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
  
    const results = await getGeocode({ address });
    setSelected({ address, results }); 
  };

  return (
    <div className="relative h-6 text-white border-b-2  border-purpleT2 flex items-center">
      <Combobox onSelect={handleSelect} className="w-[90%]">
        <ComboboxInput 
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsInteracting(true); // Defina isInteracting como true quando o usuário alterar o valor
          }}
          onBlur={() => {
            if (!value) {
              setIsInteracting(false); // Defina isInteracting como false apenas se o valor for vazio
            }
          }} // Defina isInteracting como false quando o usuário sair do campo de entrada
          disabled={!ready}
          className="pl-0 pr-0 block w-full  bg-transparent sm:text-sm ml-0 outline-none text-white placeholder-purpleT5"
          placeholder={placeholder}
          options={{
            componentRestrictions: { country: "BR" }
          }}
        />
        {isInteracting && ( // Só exiba as sugestões se o usuário estiver interagindo com o campo de entrada
          <ComboboxPopover style={{zIndex:999}}>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption
                    key={place_id}
                    className="pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-blackT1 placeholder-purpleT5"
                    value={description}
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete_Filter;
