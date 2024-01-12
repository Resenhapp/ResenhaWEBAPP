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
      />
  );
};

export default CustomSelect;