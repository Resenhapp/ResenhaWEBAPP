import React, { forwardRef, useImperativeHandle, useState } from 'react';

const MoneyInput = forwardRef((props, ref) => {
  const [value, setValue] = useState('0,00');

  const handleChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, '');

    if (inputValue.length < 3) {
      inputValue = inputValue.padStart(3, '0');
    }

    const length = inputValue.length;
    let newValue = inputValue.substring(0, length - 2) + ',' + inputValue.substring(length - 2);
    newValue = parseFloat(newValue.replace(',', '.')).toLocaleString('de-DE', {minimumFractionDigits: 2}).replace('.', '.');
    
    setValue(newValue);

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  useImperativeHandle(ref, () => parseFloat(value.replace('.', '').replace(',', '.')));

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[\d]*"
      className='bg-transparent w-full focus:outline-none placeholder-purpleT4'
      placeholder='Valor do Saque'
      value={value}
      onChange={handleChange}
    />
  );
});

MoneyInput.displayName = 'MoneyInput';

export default MoneyInput;