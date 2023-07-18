import React from 'react';

const OutlinedButton = ({ label, icon, action }) => {
    let iconSvg;
    if (icon === 'arrow') {
        iconSvg = (
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1ZM0 9.5C0 4.25329 4.25329 0 9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5Z" fill="white" />
                <path d="M5.5 9.50159C5.5 9.21061 5.73123 8.97473 6.01646 8.97473H10.2403C10.8066 8.97473 11.0902 8.27625 10.6898 7.86775L9.25722 6.40631C9.05145 6.19639 9.0544 5.85512 9.26377 5.64893C9.46798 5.44783 9.79249 5.45075 9.9932 5.6555L13.3138 9.04307C13.5621 9.2963 13.5621 9.70688 13.3138 9.96012L9.99397 13.3469C9.79386 13.551 9.46943 13.551 9.26933 13.3469C9.06989 13.1434 9.06916 12.8137 9.26772 12.6093L10.7015 11.1334C11.0992 10.724 10.815 10.0285 10.2501 10.0285H6.01646C5.73122 10.0285 5.5 9.79257 5.5 9.50159Z" fill="white" />
            </svg>
        );
    } else if (icon === null) {
        iconSvg = null;
    } else {
        iconSvg = null;
    }
    return (
        <button onClick={action} className="bg-transparent text-whiteT1 h-8 font-regular rounded-full flex justify-between ring-1 ring-inset ring-whiteT1 items-center">
            <span className="mx-4  mb-[2px]">{label}</span>
            {iconSvg && <div className="mx-2">{iconSvg}</div>}
        </button>
    );
};

export default OutlinedButton;
