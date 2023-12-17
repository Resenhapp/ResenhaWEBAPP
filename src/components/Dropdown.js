import React, { useState } from 'react';

const Dropdown = ({ options, selectedOption, setSelectedOption, values }) => {
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div>
        <select
          className='text-purpleT1 px-2 relative h-14 w-full ring-1 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center'
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled hidden>
            Escolha uma opção
          </option>
          {options.map((option, index) => (
            <option value={values ? values[index] : option} key={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
};

export default Dropdown;
