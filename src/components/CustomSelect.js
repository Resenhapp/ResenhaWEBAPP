import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = ({ placeholder, showIcon = false, Icon, readOnly = false, makeRequest, token, action, currentValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchOptions = async (inputValue) => {
    try {
      const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
        request: 'getUsersData',
        token: token,
        parameter: inputValue,
      });

      const namesArray = response.users.map((user) => ({ label: user.username, value: user.username }));

      setOptions(namesArray);
    } 
    
    catch (error) {
      console.error('Error fetching options:', error);
      setOptions([]);
    }
  };

  return (
      <Select
        value={currentValue ? { label: currentValue, value: currentValue } : null}
        options={options}
        placeholder={placeholder}
        isSearchable
        onChange={action}
        onInputChange={(inputValue) => {
          fetchOptions(inputValue);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isDisabled={readOnly}
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            margin: '20px 0px 0px 0px',
            borderRadius: '100px',
            backgroundColor: '#F6F6F6',
            padding: '0.8rem 1rem',
            fontSize: '1rem',
            color: '#6B6B6B',
            fontWeight: '500',
            ...(state.isFocused ? { backgroundColor: '#F6F6F6' } : {}),
          }),
          placeholder: (provided, state) => ({
            ...provided,
            color: '#6B6B6B',
            fontWeight: '500',
            ...(state.isFocused ? { color: '#6B6B6B' } : {}),
          }),
          menu: (provided, state) => ({
            ...provided,
            borderRadius: '1rem',
            backgroundColor: '#F6F6F6',
            padding: '1rem',
            marginTop: '0.5rem',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            zIndex: '9999',
          }),
          option: (provided, state) => ({
            ...provided,
            color: '#8E00FF',
            fontWeight: '500',
            ...(state.isFocused ? { backgroundColor: '#F6F6F6' } : {}),
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: '#6B6B6B',
            fontWeight: '500',
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#6B6B6B',
            ...(state.isFocused ? { color: '#6B6B6B' } : {}),
          }),
          indicatorSeparator: (provided, state) => ({
            ...provided,
            ...(state.isFocused ? { backgroundColor: '#6B6B6B' } : {}),
          }),
        }}
        />
  );
};

export default CustomSelect;