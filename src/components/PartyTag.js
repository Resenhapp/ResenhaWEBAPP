import React from 'react';
import classNames from 'classnames';
import Vector from './Vector';

const PartyTag = ({ tagname, bgColor, special, icon }) => {

    const baseClasses = `flex flex-row gap-1 items-center ring-inset w-fit px-3 py-1 rounded-full `;
    const colorClasses = {
      normal: `bg-${bgColor}`,
      special: `bg-blackT1`
    };

    const specialClass = {
        normal: ``,
        special: `ring-special rounded-full`
    }

    const buttonClasses = classNames(
      baseClasses,
      special ? colorClasses.special : colorClasses.normal
    );


const specialClasses = classNames(
      special ? specialClass.special : specialClass.normal
    );

    return ( 
      <div className={specialClasses}>  
          <div className={buttonClasses}>
            <Vector vectorname={icon} />
            {tagname}
          </div>
      </div>
    );
};

export default PartyTag;
