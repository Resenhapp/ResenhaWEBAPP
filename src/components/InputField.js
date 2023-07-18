import React from 'react';
import Vector from './Vector';

const InputField = ({ placeholder, value, action, showIcon = false, Icon, Required = false }) => {
  return (
    <div className="relative h-14 ring-1 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      {showIcon && Icon && (
        <div className="absolute left-0 pl-3 flex">
          {Icon === 'lock' ? (
            <Vector vectorname={'lock01'} />
          ) : Icon === 'mail' ? (
            <Vector vectorname={'mail01'} />
          ) : Icon === 'id' ? (
            <Vector vectorname={'id01'} />
          ) : Icon === 'calendar' ? (
            <Vector vectorname={'calendar02'} />
          ) : Icon === 'person' ? (
            <Vector vectorname={'person01'} />
          ) : Icon === 'card' ? (
            <Vector vectorname={'card01'} />
          ) : Icon === 'cvv' ? (
            <Vector vectorname={'cvv01'} />
          ) : Icon === 'thunder' ? (
            <Vector vectorname={'thunder01'} />
          ) : Icon === 'pin' ? (
            <Vector vectorname={'pin01'} />
          ) : Icon === 'user' ? (
            <Vector vectorname={'user02'} />
          ) : null}
        </div>
      )}
      <input
        type="text"
        className={`pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-purpleT2 placeholder-purpleT5 ${showIcon ? 'pl-10' : ''
          }`}
        placeholder={placeholder}
        value={value}
        onChange={action}
        required={Required}
      />
    </div>
  );
};

export default InputField;