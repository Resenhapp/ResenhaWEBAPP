import React, { useState } from 'react';
import Vector from '@/src/components/Vector';

const Piece03 = () => {
    var [value, setValue] = useState('2,00');
    var [guestsValue, setGuestsValue] = useState (1);
    const handleChange = (event) => {
        let inputValue = event.target.value.replace(/[^0-9]/g, '');

        if (inputValue.length < 3) {
            inputValue = inputValue.padStart(3, '0');
        }

        const length = inputValue.length;
        let newValue = inputValue.substring(0, length - 2) + ',' + inputValue.substring(length - 2);
        newValue = parseFloat(newValue.replace(',', '.')).toLocaleString('de-DE', { minimumFractionDigits: 2 }).replace('.', '.');

        setValue(newValue);

        console.log(inputValue);
    };

    const handleGuestsChange = (event) => {
        const inputValue = event.target.value;
        setGuestsValue(inputValue);
      };

    const handleButtonClick = (amount) => {
        const currentValue = parseFloat(value.replace(/[^0-9.,-]/g, '').replace(',', '.'));
        const newValue = currentValue + amount;
        const formattedValue = newValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setValue(formattedValue);
    };

    const handleGuestsPlus = (amount) => {
        const currentValue = parseInt(guestsValue);
        const newValue = currentValue + amount;
        setGuestsValue(newValue);
      };
      

    return (
        <div className="w-full flex flex-col h-fit gap-6">
            <div>
                <h1 className='text-center mb-4'>Valor da entrada:</h1>
                <div className="justify-center flex flex-col items-center gap-3">
                    <div className='flex flex-row gap-2 items-center'>
                        <button
                            className=" bg-purpleT2 h-fit w-fit p-4 ring-2 ring-inset text-xl ring-purpleT3 rounded-full"
                            onClick={() => handleButtonClick(-1)}
                        >
                            <Vector vectorname={'minus01'} />
                        </button>
                        <div className="w-48 p-4 bg-purpleT2 gap-1 ring-2 ring-inset rounded-full content-center items-center justify-center flex flex-row ring-purpleT3">
                            <h1 className="bg-transparent w-fit h-fit text-whiteT1 text-2xl font-bold">R$</h1>
                            <input
                                type="text"
                                className="w-28 bg-transparent text-whiteT1 text-2xl font-bold"
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className=" bg-purpleT2 h-fit w-fit p-4 ring-2 ring-inset text-xl ring-purpleT3 rounded-full"
                            onClick={() => handleButtonClick(1)}
                        >
                            <Vector vectorname={'plus01'} />
                        </button>
                    </div>
                    <div className="flex flex-row gap-2 justify-center">
                        <button
                            className="p-4 bg-purpleT2 ring-2 ring-inset text-xl ring-purpleT3 rounded-xl"
                            onClick={() => handleButtonClick(5)}
                        >
                            +R$ 5
                        </button>
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
                    </div>
                </div>
                <hr className='bg-purpleT4 h-[2px] my-8 border-none rounded-full' />

                <h1 className='text-center mb-4'>Capacidade máxima de convidados:</h1>
                <div className="justify-center flex flex-col items-center gap-3">
                    <div className='flex flex-row gap-2 items-center'>
                        <button
                            className=" bg-purpleT2 h-fit w-fit p-4 ring-2 ring-inset text-xl ring-purpleT3 rounded-full"
                            onClick={() => handleGuestsPlus(-1)}
                        >
                            <Vector vectorname={'minus01'} />
                        </button>
                        <div className="w-48 p-4 bg-purpleT2 gap-1 ring-2 ring-inset rounded-full content-center items-center justify-center flex flex-row ring-purpleT3">
                            <input
                                type="text"
                                className="w-28 text-center bg-transparent text-whiteT1 text-2xl font-bold"
                                value={guestsValue}
                                onChange={handleGuestsChange}
                            />
                        </div>
                        <button
                            className=" bg-purpleT2 h-fit w-fit p-4 ring-2 ring-inset text-xl ring-purpleT3 rounded-full"
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
