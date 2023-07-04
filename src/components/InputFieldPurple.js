import React from 'react';
import Vector from './Vector';

const InputFieldPurple = ({ placeholder, value, onChange, showIcon = false, Icon }) => {
    const handleInputChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="relative h-12 ring-1 ring-inset ring-purpleT2 bg-purpleT2 rounded-2xl flex items-center">
            {showIcon && Icon && (
                <div className="absolute left-0 pl-3 flex">
                    {Icon === 'lock' ? (
                        <Vector vectorname={'lock01'} />
                    ) : Icon === 'mail' ? (
                        <Vector vectorname={'mail01'} />
                    ) : null}
                </div>
            )}
            <input
                type="text"
                className={`pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl outline-none text-whiteT placeholder-purpleT5 ${showIcon ? 'pl-10' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default InputFieldPurple;
