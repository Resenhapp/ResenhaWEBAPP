import React from 'react';
import Vector from './Vector';

const RoundButton = ({ icon, onClick }) => {
  let iconSvg;

  if (icon === 'plus') {
    iconSvg = (
      <Vector vectorname={'plus03'} />
    );
  } else if (icon === 'arrow') {
    iconSvg = (
      <Vector vectorname={'arrowRight03'} />
    );
  } else if (icon === 'share') {
    iconSvg = (
      <Vector vectorname={'share01'} />
    );
  } else if (icon === 'chat') {
    iconSvg = (
      <Vector vectorname={'chat01'} />
    );
  }

  return (
    <button onClick={onClick} className="bg-[#0000004D] z-[10] ring-1 ring-inset ring-whiteT1 backdrop-blur-xl align-center justify-center items-center flex shadow-lg shadow-[#ffffff26] text-purpleT3 hover:bg-white w-16 h-16 font-bold p-4 rounded-full">
      {iconSvg && <div className="">{iconSvg}</div>}
    </button>
  );
};

export default RoundButton;
