import React, { useState, useEffect } from 'react';
import Vector from './Vector';

const AddressField = ({ placeholder, onAddressSelect, initialAddress }) => {
    const [address, setAddress] = useState(initialAddress);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const onChange = (e) => {
        const value = e.target.value;
        setAddress(value);
        fetchSuggestions(value); // You'll replace this with your actual API call
    };

    const fetchSuggestions = async (query) => {
        if (query.length > 0) {
            // Replace this with your actual API call
            const res = await fetch(`/api/address?q=${query}`);
            const json = await res.json();
            setSuggestions(json.addresses);
        } else {
            setSuggestions([]);
        }
    };

    const onSelectSuggestion = (suggestion) => {
        setAddress(suggestion);
        setShowSuggestions(false);
        if (onAddressSelect) {
            onAddressSelect(suggestion);
        }
    };

    return (
        <div className="relative h-14 ring-1 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
            <div className="absolute left-0 pl-3 flex">
                <Vector vectorname={'pin01'} />
            </div>
            <input
                type="text"
                className={`pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-purpleT2 placeholder-purpleT5`}
                placeholder={placeholder}
                value={address}
                onChange={onChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow overflow-y-auto max-h-60">
                    {suggestions.map((suggestion, index) => (
                        <div 
                            key={index}
                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AddressField;
