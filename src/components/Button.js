import React from 'react';
import Vector from './Vector';

const Button = ({ label, icon, action, iconSide = 'left', height = 1, width = 1, textAlign = 'center', active = true }) => {
    // map height and width to the respective Tailwind classes
    const sizes = {
        1: 'w-full',
        2: 'w-4/5',
        3: 'w-[190px]',
    };

    let iconSvg;
    if (icon === 'plus') {
        iconSvg = (
            <Vector vectorname={'plus05'} />
        );
    } else if (icon === 'arrow') {
        iconSvg = (
            <Vector vectorname={'arrowRight06'} />
        );
    } else if (icon === 'share') {
        iconSvg = (
            <Vector vectorname={'share02'} />
            
        );
    } else if (icon === 'user') {
        iconSvg = (
            <Vector vectorname={'user03'} />
        );
    } else if (icon === 'user2') {
        iconSvg = (
            <Vector vectorname={'user02'} />
        );
    } else if (icon === 'wallet') {
        iconSvg = (
            <Vector vectorname={'wallet01'} />
        );
    } else if (icon === 'thunder') {
        iconSvg = (
            <Vector vectorname={'thunder04'} />
        );
    } else if (icon === 'gear') {
        iconSvg = (
            <Vector vectorname={'gear01'} />
            
        );
    } else if (icon === 'trusted') {
        iconSvg = (
            <Vector vectorname={'trusted01'} />
            
        );
    } else if (icon === 'question') {
        iconSvg = (
            <Vector vectorname={'question02'} />
            
        );
    } else if (icon === 'money') {
        iconSvg = (
            <Vector vectorname={'money02'} />
            
        )
    } else if (icon === 'shield') {
        iconSvg = (
            <Vector vectorname={'shield02'} />
            
        )
    } else if (icon === 'lock') {
        iconSvg = (
            <Vector vectorname={'lock03'} />
            
        )
    } else if (icon === 'bell') {
        iconSvg = (
            <Vector vectorname={'bell03'} />
            
        )
    } else if (icon === 'arrowDown') {
        iconSvg = (
            <Vector vectorname={'arrowDown01'} />
            
        )
    } else if (icon === 'check') {
        iconSvg = (
            <Vector vectorname={'check01'} />
            
        )
    }

    const containerStyles = `bg-whiteT1 shadow-lg shadow-[#ffffff26] text-purpleT3 hover:bg-white font-bold py-5 px-5 rounded-full flex justify-center items-center ${sizes[width]} h-${sizes[height]} ${active ? "bg-whiteT1" : "deactivated"} max-w-[500px]`;

    const textStyles = `flex-1 text-${textAlign} w-full ${icon && iconSide === 'right' ? 'ml-7' : 'mr-7'}`;

    const iconStyles = `${iconSide === 'right' ? 'ml-3' : 'mr-3'}`;

    return (
        <button disabled={!active} onClick={action} className={containerStyles}>
            {icon && iconSide === 'left' && <div className={iconStyles}>{iconSvg}</div>}
            <span className={textStyles}>{label}</span>
            {icon && iconSide === 'right' && <div className={iconStyles}>{iconSvg}</div>}
        </button>
    );
};

export default Button;
