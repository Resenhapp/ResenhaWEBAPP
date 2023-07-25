import React from 'react';
import Vector from './Vector';

const Checker = ({ labelText, showLabel, startChecked, action }) => {
    return (
        <div className="flex items-center p-3">
                <input
                    id="checkbox"
                    type="checkbox"
                    value=""
                    defaultChecked={startChecked}
                    onChange={action}
                    className="w-6 h-6"
                />
            {showLabel &&
                <label htmlFor="purple-checkbox" for="checkbox" className="ml-2 text-sm font-medium text-whiteT1">
                    {labelText}
                </label>
            }
        </div>
    );
};

export default Checker;
