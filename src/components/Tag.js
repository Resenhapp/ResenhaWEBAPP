import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Vector from './Vector';

const Tag = ({ tagname, type = 'tag', colorName, highlightColor, isEditable = false, selected: selectedProp = false, onClick }) => {
  
    const [selected, setSelected] = useState(selectedProp);
    const vectorName = selected ? 'xmark02' : 'plus04';
  
    useEffect(() => {
      setSelected(selectedProp);
    }, [selectedProp]);
  
    const handleClick = () => {
      if (!isEditable) return;
      setSelected(!selected);
      onClick && onClick(!selected);
      const action = selected ? 'deselected' : 'selected';
      console.log(`${type} ${action}: ${tagname}`);
    };
  
    const baseClasses = 'flex flex-row gap-1 items-center w-fit px-3 py-2 rounded-full ring-0 ring-inset';
    const colorClasses = {
      tag: selected ? 'bg-purpleT3 ring-[#FFFFFF80] ring-0' : `bg-purpleT2`,
      interest: selected ? `bg-${highlightColor} ring-2 ring-[#FFFFFF80]` : `bg-${colorName}`,
    };
  
    const buttonClasses = classNames(
      baseClasses,
      colorClasses[type]
    );
  
    return (
      <button onClick={handleClick} className={buttonClasses}>
        {isEditable && <Vector vectorname={vectorName} />}
        {tagname}
      </button>
    );
};
  
export default Tag;
