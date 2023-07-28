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
  style={{ objectFit: 'contain' }}
  className={`w-24 ring-2 m-1 ring-purpleT3 ring-inset p-[2px] rounded-full ${isBlurried ? 'blur-[2px]' : ''}`}
  onClick={handlePortraitClick}
/>
  );
};

export default UserPortrait;
