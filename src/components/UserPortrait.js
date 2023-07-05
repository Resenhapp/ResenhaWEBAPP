import React from 'react';

const UserPortrait = ({isBlurried, imageUrl}) => {
    return(
            <img
                src={imageUrl} 
                alt="Retrato do convidado"
                style={{ objectFit: 'cover'}}
                className={` w-24 h-24 ring-1 m-1 ring-purpleT3 rounded-full ${isBlurried ? 'blur-[2px]' : ''}`}
            />
    )
}

export default UserPortrait;
