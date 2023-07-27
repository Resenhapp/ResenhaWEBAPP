import React, { useState } from 'react';

const DateComponent = ({ number, day, month, year, selectedDate, onDateSelect }) => {
  const fullDate = new Date(year, new Date(`1 ${month} 2000`).getMonth(), number); // Generate the full date object
  const isSelected = selectedDate?.getTime() === fullDate.getTime(); // Check if this date is selected

  const handleClick = () => {
    onDateSelect(fullDate); // Pass the full date and its components to onDateSelect
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
