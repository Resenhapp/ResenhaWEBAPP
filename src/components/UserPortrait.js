import React from 'react';

const UserPortrait = ({ name, image }) => {
    return (
        <div className="flex flex-col bg-purpleT1 ring-purpleT3 ring-2 ring-inset p-2 rounded-xl items-center justify-center">
            <div className="w-36 h-36 rounded-md bg-whiteT1">
                <img src={image} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="font-regular text-white text-left w-full text-sm mt-1">{name}</span>
            <span className="font-bold text-white text-left w-full text-sm mt-1 text-glow">confirmado</span>
        </div>
    );
};

export default UserPortrait;