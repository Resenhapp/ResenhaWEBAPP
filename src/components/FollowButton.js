import React, { useState } from 'react';
import Vector from './Vector';

const FollowButton = ({ content, onClick }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const handleOnClick = () => {
        setIsFollowing(!isFollowing);
        onClick && onClick(!isFollowing);
    };

    return (
        <button
            onClick={handleOnClick}
            className={`w-fit h-fit py-3 px-5 flex flex-row font-medium gap-2 items-center ${isFollowing ?
                'text-whiteT1 bg-purpleT3' : 'text-purpleT3 bg-whiteT1'} rounded-full shadow-md`}
        >
            <Vector vectorname={isFollowing ? 'following01' : 'follow01'} />
            {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    );
}

export default FollowButton;
