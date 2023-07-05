import React from 'react';
import Vector from './Vector';

const ConfigDropDown = ({ action, options = [], defaultOption = options[0] }) => {
    
    /*
    const defaultOption = (optionvalue) => {
        option[optionvalue]
    };
    */

    return (
        <div className="relative h-12 ring-1 ring-inset ring-purpleT2 bg-purpleT2 rounded-2xl flex items-center">
            <select
                className={'pl-3 block w-[90%] bg-purpleT2 sm:text-sm rounded-xl outline-none text-whiteT placeholder-purpleT5'}
                onChange={action}
                defaultValue={defaultOption} // Definir o valor padrão aqui
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Vector vectorname={'arrowDown02'} />
        </div>
    );
};

export default ConfigDropDown;
