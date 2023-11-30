/* import React, { useState, useEffect } from "react";
import Vector from './Vector';
import { useLoadScript } from "@react-google-maps/api";
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

const libraries = ["places"];

const PlacesAutocomplete = ({ setSelected }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const initializePlacesService = () => {
        const service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        setPlacesService(service);
      };
      initializePlacesService();
    }
  }, [isLoaded]);

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
        const { lat, lng } = await getLatLng(results[0]);
        setSelectedLocation({ lat, lng });
        setSelected({ lat, lng });
      };
    
  
      return (
        <>
          {isLoaded ? (
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
                  placeholder="Search an address"
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
          ) : (
            <div>{loadError ? "Error ao carregar" : "Carregando..."}</div>
          )}
        </>
      );
    };
  
  export default PlacesAutocomplete; */