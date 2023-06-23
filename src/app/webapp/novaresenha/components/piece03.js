import React, { useState } from 'react';

const Piece03 = () => {
  const [entryValue, setEntryValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    let formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    const parts = formattedValue.match(/^(\d+)(\d{2})$/); // Split into whole and decimal parts

    if (parts) {
      formattedValue = `${parts[1]},${parts[2]}`; // Add decimal separator
    }

    setEntryValue(formattedValue);
  };

  const handleButtonClick = (amount) => {
    setEntryValue((prevValue) => {
      const currentValue = parseFloat(prevValue.replace(/[^0-9.,-]/g, '').replace(',', '.'));
      const newValue = currentValue + amount;
      return formatCurrency(newValue.toFixed(2));
    });
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value.replace(/[^0-9.,-]/g, '').replace(',', '.'));
    const formattedValue = number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedValue.replace(',', '.');
  };

  return (
    <div className="w-full flex flex-col h-fit gap-6">
      <div>
        <h1>Valor da entrada:</h1>
        <div className="justify-center flex flex-col items-center gap-3">
          <div className="w-56 p-4 bg-purpleT2 gap-1 ring-2 ring-inset rounded-full content-center items-center justify-center flex flex-row ring-purpleT3">
            <h1 className="bg-transparent w-fit h-fit text-whiteT1 text-2xl font-bold">R$</h1>
            <input
              type="text"
              className="w-28 bg-transparent text-whiteT1 text-2xl font-bold"
              value={entryValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <button
              className="p-4 bg-purpleT2 ring-2 ring-inset text-xl ring-purpleT3 rounded-xl"
              onClick={() => handleButtonClick(10)}
            >
              +R$ 10
            </button>
            <button
              className="p-4 bg-purpleT2 ring-2 ring-inset text-xl ring-purpleT3 rounded-xl"
              onClick={() => handleButtonClick(20)}
            >
              +R$ 20
            </button>
            <button
              className="p-4 bg-purpleT2 ring-2 ring-inset text-xl ring-purpleT3 rounded-xl"
              onClick={() => handleButtonClick(50)}
            >
              +R$ 50
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece03;
