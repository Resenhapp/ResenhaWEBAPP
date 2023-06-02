import React from 'react';

const Toggle = ({ labelText, showLabel, startToggled }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" defaultChecked={startToggled} />
      <div className="w-11 h-6 rounded-full peer dark:bg-purpleT1 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-purpleT3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whiteT1"></div>
      {showLabel && <span className="text-sm ml-1 font-thin">{labelText}</span>}
    </label>
  );
};

export default Toggle;
