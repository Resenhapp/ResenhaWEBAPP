import React, { useState, useEffect } from "react";
import Vector from './Vector';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = ({ setSelected }) => {
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
  } = usePlacesAutocomplete({ placesService });
  
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    setSelected({ address });
  };

  return (
    <div className="relative h-14 ring-1 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      <div className="absolute left-0 pl-3 flex">
        <Vector vectorname={'pin01'} />
      </div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-blackT1 placeholder-purpleT5"
          placeholder="Endereço da resenha"
          options={{
            componentRestrictions: { country: "BR" }
          }}
        />
        <ComboboxPopover>
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

export default PlacesAutocomplete;
