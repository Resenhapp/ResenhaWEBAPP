import React, { useState } from 'react';
import Vector from './Vector';

const EventHour = ({ hasEnd, returnedStart, returnedEnd }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}${value.slice(2)}`;
    }
    setStartTime(value);
  };
  

  const handleEndTimeChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}${value.slice(2)}`;
    }
    setEndTime(value);
  };

  const formatTime = (time) => {
    if (time.length === 1) {
      return `${time}`;
    } else if (time.length === 2 && parseInt(time) > 23) {
      return '23';
    } else if (time.length === 2) {
      return time;
    } else if (time.length === 3 && parseInt(time.substring(0, 2)) > 23) {
      return `23:${time.substring(2)}`;
    } else if (time.length === 3) {
      return `${time.substring(0, 2)}:${time.substring(2)}`;
    } else if (time.length === 4 && parseInt(time.substring(0, 2)) > 23) {
      return `23:${time.substring(2)}`;
    } else if (time.length === 4) {
      return `${time.substring(0, 2)}:${time.substring(2)}`;
    }
    return time;
  };

  const startHourColor = 'text-whiteT1';
  const endHourColor = hasEnd ? 'text-whiteT1' : 'text-purpleT3';

  return (
    <div className="w-full h-fit p-4 rounded-xl bg-purpleT1 ring-2 ring-inset ring-purpleT2 flex flex-row items-center justify-between">
      <div className="w-[30%]">
        <h1 className={`w-fit ${startHourColor}`}>Começa</h1>
        <input
          type="text"
          className={`w-full text-3xl bg-transparent ${startHourColor}`}
          value={formatTime(startTime)}
          onChange={handleStartTimeChange}
          maxLength={5}
        />
      </div>
      <div className="w-8 h-8">
        <Vector vectorname={'arrowRight01'} />
      </div>
      <div className={`w-[30%] ${!hasEnd ? 'text-purpleT1' : ''}`}>
        <h1 className={`w-fit ${endHourColor}`}>Termina</h1>
        <input
          type="text"
          className={`w-full text-3xl bg-transparent ${endHourColor}`}
          value={formatTime(endTime)}
          onChange={handleEndTimeChange}
          maxLength={5}
          disabled={!hasEnd}
        />
      </div>
    </div>
  );
};

export default EventHour;
