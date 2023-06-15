import React from 'react';

const Checker = ({ labelText, showLabel, startChecked, action}) => {
    return (
        <label className="flex items-center cursor-pointer">
            <input id="comments" name="comments" type="checkbox" className="h-5 w-5 rounded-xl text-purple-600 bg-purple-600" defaultChecked={startChecked} onChange={action} />
            {showLabel && <span className="text-sm ml-1 text-whiteT1 font-thin">{labelText}</span>}
        </label>
    );
};

export default Checker;
