'use client'
import React from 'react';
// import { useRouter } from 'next/router';

const Back = () => {
    // const router = useRouter();

    const handleOnClick = () => {}
    //     router.back();
    return (
        <button onClick={handleOnClick} className="w-12 h-8 ring-2 ring-purpleT3 bg-purpleT2 rounded-full align-center items-center flex justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.00239C12 5.56592 11.6532 5.21209 11.2253 5.21209H4.88952C4.04009 5.21209 3.61469 4.16438 4.21533 3.55162L6.36417 1.35947C6.67283 1.04458 6.66841 0.53268 6.35435 0.223401C6.04803 -0.078257 5.56126 -0.073876 5.26021 0.233248L0.279261 5.3146C-0.0930865 5.69446 -0.0930874 6.31032 0.27926 6.69018L5.25905 11.7704C5.5592 12.0766 6.04585 12.0765 6.346 11.7703C6.64517 11.4651 6.64626 10.9706 6.34843 10.664L4.19769 8.45004C3.60122 7.83603 4.02755 6.79269 4.87492 6.79269H11.2253C11.6532 6.79269 12 6.43886 12 6.00239Z" fill="#D6A3FF" />
            </svg>
        </button>
    );
}


export default Back;
