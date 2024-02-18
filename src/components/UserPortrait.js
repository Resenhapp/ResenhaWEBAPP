import React from 'react';

const UserPortrait = ({ isBlurried, imageUrl, userId, userName }) => {

  const handlePortraitClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `/perfil?u=${userName}`;
    }
  };

  return (
    <img
      src={imageUrl}
      alt="Retrato do convidado"
      className={`w-14 h-14 object-cover ring-2 m-1 ring-purpleT3 ring-inset p-[2px] rounded-full ${isBlurried ? 'blur-[2px]' : ''}`}
      onClick={handlePortraitClick}
    />
  );
};

export default UserPortrait;
