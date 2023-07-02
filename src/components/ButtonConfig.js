import React from 'react';
import Vector from './Vector';

const ButtonConfig = ({ label, leftIcon, rightIcon, action, textAlign = 'center', active = true }) => {
    const containerStyles = `bg-whiteT1 shadow-lg shadow-[#ffffff26] text-purpleT3
     hover:bg-white py-3 px-4 rounded-full flex justify-center items-center
      ${active ? 'bg-whiteT1' : 'deactivated'} max-w-[500px]`;

    const textStyles = `flex-1 text-${textAlign} w-full`;

    return (
        <button disabled={!active} onClick={action} className={containerStyles}>
            {leftIcon && (
                <div className="mr-3">
                    <Vector vectorname={leftIcon} />
                </div>
            )}
            <span className={textStyles}>{label}</span>
            {rightIcon && (
                <div className="ml-3">
                    <Vector vectorname={rightIcon} />
                </div>
            )}
        </button>
    );
};

export default ButtonConfig;
