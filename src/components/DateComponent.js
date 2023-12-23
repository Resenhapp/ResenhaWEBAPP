import React, { useState } from 'react';

const DateComponent = ({ number, day, month, year, selectedDate, onDateSelect }) => {

  const monthsMap = {
    'jan': 1,
    'fev': 2,
    'mar': 3,
    'abr': 4,
    'mai': 5,
    'jun': 6,
    'jul': 7,
    'ago': 8,
    'set': 9,
    'out': 10,
    'nov': 11,
    'dez': 12
  };

  const fullDate = new Date(year, monthsMap[month] - 1, number);
  const isSelected = selectedDate?.getTime() === fullDate.getTime();

  const handleClick = () => {
    onDateSelect(fullDate);
  };

  return (
    <div
      className={`bg-purpleT1 w-32 items-center ring-1 flex flex-col justify-center content-center ring-inset rounded-xl ${
        isSelected ? 'ring-purpleT3 bg-purpleT2' : 'ring-purpleT2'
      } px-7 py-5 cursor-pointer`}
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
