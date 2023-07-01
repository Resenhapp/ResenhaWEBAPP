import React from 'react';

const Checker = ({ labelText, showLabel, startChecked, action }) => {
    return (
        <div className="flex items-center p-3">
            <input
                id=""
                type="checkbox"
                value=""
                defaultChecked={startChecked}
                onChange={action}
                className="w-5 h-5 rounded-lg accent-purpleT3 ring-1 ring-whiteT1"
            />
            {showLabel &&
                <label htmlFor="purple-checkbox" className="ml-2 text-sm font-medium text-whiteT1">
                    {labelText}
                </label>
            }
        </div>
    );
};

export default Checker;
