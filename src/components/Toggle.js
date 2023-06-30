"use client"
import React, { useState } from 'react';
import Vector from './Vector';

const Toggle = ({ labelText, showLabel, startToggled, showQuestion, questionAction, textColor, onToggle }) => {
  const [isToggled, setIsToggled] = useState(startToggled);

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
    if (typeof onToggle === 'function') {
      onToggle(!isToggled);
    }
  };

  return (
    <label className={`relative inline-flex items-center cursor-pointer ${textColor === 'purple' ? 'text-purpleT2' : 'text-whiteT1'}`}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isToggled}
        onChange={handleToggleChange}
      />
      <div className="w-11 h-6 rounded-full peer dark:bg-purpleT2 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-purpleT3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whiteT1"></div>
      {showLabel && <span className="text-sm ml-2 font-thin">{labelText}</span>}
      {showQuestion && (
        <div 
        className='flex justify-center content-center items-center scale-125' 
        onClick={(e) => {
            e.stopPropagation();
            questionAction();
        }}
    >
        <Vector vectorname={'question01'} />
    </div>
      )}
    </label>
  );
};

export default Toggle;
