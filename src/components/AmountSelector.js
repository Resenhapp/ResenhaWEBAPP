import React, { useState, useEffect } from 'react';

const AmountSelector = ({ onChange }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    onChange && onChange(count);
  }, [count, onChange]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button 
        className='text-xl text-purpleT2 w-8 bg-whiteT1 rounded-xl align-center justify-center items-center' 
        onClick={handleDecrement} 
        style={{ marginRight: '10px' }}
      >
        -
      </button>
      <span className='text-xl text-purpleT2 font-bold'>{count}</span>
      <button 
        className='text-xl text-purpleT2 w-8 bg-whiteT1 rounded-xl align-center justify-center items-center' 
        onClick={handleIncrement} 
        style={{ marginLeft: '10px' }}
      >
        +
      </button>
    </div>
  );
};

export default AmountSelector;
