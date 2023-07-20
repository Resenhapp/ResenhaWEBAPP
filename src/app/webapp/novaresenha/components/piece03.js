import React, { useState, useEffect } from 'react';
import Vector from '@/src/components/Vector';
import PlusValue from '@/src/components/PlusValue';

const Piece03 = ({ guestsAmount, priceAmount, onFillingComplete }) => {
  const [value, setValue] = useState('2,00');
  const [guestsValue, setGuestsValue] = useState(1);

  useEffect(() => {
    onFillingComplete(true);
  }, []); 

  useEffect(() => {
    guestsAmount(guestsValue);
    priceAmount(value);
  }, [guestsValue, value, guestsAmount, priceAmount]);

  const handleChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, '');

    if (inputValue.length < 3) {
      inputValue = inputValue.padStart(3, '0');
    }

    const length = inputValue.length;
    let newValue =
      inputValue.substring(0, length - 2) +
      ',' +
      inputValue.substring(length - 2);
    newValue = parseFloat(newValue.replace(',', '.'))
      .toLocaleString('de-DE', { minimumFractionDigits: 2 })
      .replace('.', '.');

    setValue(newValue);
  };

  const handleGuestsChange = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, '');
    inputValue = inputValue === '' ? '0' : inputValue;

    const newValue = parseInt(inputValue);
    setGuestsValue(newValue >= 1 ? newValue : 1);
  };

  const handleButtonClick = (amount) => {
    const currentValue = parseFloat(value.replace(/[^0-9.,-]/g, '').replace(',', '.'));
    const newValue = currentValue + amount;

    if (newValue >= 2) {
      const formattedValue = newValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setValue(formattedValue);
    } else {
      setValue(value);
    }
  };

  const handleGuestsPlus = (amount) => {
    const currentValue = parseInt(guestsValue);
    const newValue = currentValue + amount;

    if (newValue >= 1) {
      setGuestsValue(newValue);
    } else {
      setGuestsValue(guestsValue);
    }
  };

  return (
    <div className="w-full flex flex-col h-fit gap-6">
      <div>
        <h1 className="text-center mb-4">Valor da entrada:</h1>
        <div className="justify-center flex flex-col items-center gap-3">
          <div className="flex flex-row gap-2 items-center">
            <button
              className="bg-purpleT2 h-fit w-fit p-4 ring-1 ring-inset text-xl ring-purpleT3 rounded-full"
              onClick={() => handleButtonClick(-1)}
            >
              <Vector vectorname={'minus01'} />
            </button>
            <div className="w-48 p-4 bg-purpleT2 gap-1 ring-1 ring-inset rounded-full content-center items-center justify-center flex flex-row ring-purpleT3">
              <h1 className="bg-transparent w-fit h-fit text-whiteT1 text-2xl font-bold">R$</h1>
              <input
                type="text"
                className="w-28 bg-transparent text-whiteT1 text-2xl font-bold"
                value={value}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-purpleT2 h-fit w-fit p-4 ring-1 ring-inset text-xl ring-purpleT3 rounded-full"
              onClick={() => handleButtonClick(1)}
            >
              <Vector vectorname={'plus01'} />
            </button>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <PlusValue value={5} handleClick={handleButtonClick} />
            <PlusValue value={10} handleClick={handleButtonClick} />
            <PlusValue value={20} handleClick={handleButtonClick} />
          </div>
        </div>
        <hr className="bg-purpleT4 h-[2px] my-8 border-none rounded-full" />

        <h1 className="text-center mb-4">Capacidade máxima de convidados:</h1>
        <div className="justify-center flex flex-col items-center gap-3">
          <div className="flex flex-row gap-2 items-center">
            <button
              className="bg-purpleT2 h-fit w-fit p-4 ring-1 ring-inset text-xl ring-purpleT3 rounded-full"
              onClick={() => handleGuestsPlus(-1)}
            >
              <Vector vectorname={'minus01'} />
            </button>
            <div className="w-48 p-4 bg-purpleT2 gap-1 ring-1 ring-inset rounded-full content-center items-center justify-center flex flex-row ring-purpleT3">
              <input
                type="text"
                className="w-28 text-center bg-transparent text-whiteT1 text-2xl font-bold"
                value={guestsValue}
                onChange={handleGuestsChange}
              />
            </div>
            <button
              className="bg-purpleT2 h-fit w-fit p-4 ring-1 ring-inset text-xl ring-purpleT3 rounded-full"
              onClick={() => handleGuestsPlus(1)}
            >
              <Vector vectorname={'plus01'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piece03;
