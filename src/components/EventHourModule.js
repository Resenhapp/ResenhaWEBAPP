import React, { useState } from 'react';
import Vector from './Vector';

const EventHour = ({ hasEnd, placeHolderStart, placeHolderEnd, onStartTimeClick, onEndTimeClick }) => {

  const startHourColor = 'text-whiteT1';
  const endHourColor = hasEnd ? 'text-whiteT1' : 'text-purpleT3';

  return (
    <div className="w-full h-fit p-4 rounded-xl bg-purpleT1 ring-1 ring-inset ring-purpleT2 flex flex-row items-center justify-between">
      <div className="w-[30%]">
        <h1 className={`w-fit ${startHourColor}`}>Começa</h1>
        <button
          onClick={onStartTimeClick}
          className={`w-full placeholder-purpleT2 content-center items-center justify-center flex text-3xl bg-transparent ${startHourColor}`}
        >
          {placeHolderStart}
        </button>
      </div>
      <div className="w-8 h-8">
        <Vector vectorname={'arrowRight01'} />
      </div>
      <div className={`w-[30%] ${!hasEnd ? 'text-purpleT1' : ''}`}>
        <h1 className={`w-fit ${endHourColor}`}>Termina</h1>
        <button
          onClick={hasEnd ? onEndTimeClick : null}
          className={`w-full placeholder-purpleT2 content-center items-center justify-center flex text-3xl bg-transparent ${endHourColor}`}
        >
          {placeHolderEnd}
        </button>
      </div>
    </div>
  );
};

export default EventHour;
