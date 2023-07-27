import React, { useState } from 'react';
import DateComponent from './DateComponent';

const DateScroll = ({ onDateSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleDateSelect = (date) => {
    setSelected(date);
    onDateSelect(date);
  };

  const currentDate = new Date();

  const dateComponents = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);

    const dayName = date.toLocaleString('pt-BR', { weekday: 'short' });
    const monthName = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    const dayNumber = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    dateComponents.push(
      <DateComponent
        key={i}
        day={dayName}
        number={dayNumber}
        month={monthName}
        year={year}
        selectedDate={selected}
        onDateSelect={handleDateSelect}
      />
    );
  }

  return (
    <div>
      <div className="bg-scroll flex flex-row gap-2 h-fit w-full overflow-x-scroll">
        {dateComponents}
      </div>
    </div>
  );
};

export default DateScroll;
