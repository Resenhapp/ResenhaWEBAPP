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

const PlacesAutocomplete_Edit = ({ setSelected }) => {
  const [placesService, setPlacesService] = useState(null);

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
  
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
  
    const results = await getGeocode({ address });
    setSelected({ address, results }); 
  };

  return (
    <div className="relative h-14 text-white border-b-2  border-purpleT2 flex items-center">
      <div className="absolute left-0 pl-3  flex">
        <Vector vectorname={'pin01'} />
      </div>
      <Combobox onSelect={handleSelect} className="w-[90%]">
        <ComboboxInput 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="pl-3 pr-2 block w-full  bg-transparent sm:text-sm ml-7 outline-none text-white placeholder-purpleT5"
          placeholder="Endereço da resenha"
          options={{
            componentRestrictions: { country: "BR" }
          }}
        />
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
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete_Edit;
