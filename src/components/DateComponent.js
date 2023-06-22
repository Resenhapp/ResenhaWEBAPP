import React, { useState } from 'react';

const DateComponent = ({ number, day, month, selectedDate, onDateSelect }) => {
  const isSelected = selectedDate === number;

  const handleClick = () => {
    onDateSelect(number);
  };

  return (
    <div
      className={`bg-purpleT1 w-32 items-center ring-2 flex flex-col justify-center content-center ring-inset rounded-xl ${
        isSelected ? 'ring-purpleT3 bg-purpleT2' : 'ring-purpleT2'
      } px-7 py-8 cursor-pointer`}
      onClick={handleClick}
    >
      <div className='w-10'>
        <h1 className="text-2xl font-bold text-whiteT1 text-center w-full">{number}</h1>
        <h1 className="text-whiteT1 text-[18px] text-center w-full">{month}</h1>
        <h1 className="text-whiteT1 text-[14px] text-center w-full">{day}</h1>
      </div>
    </div>
  );
};

export default DateComponent;
