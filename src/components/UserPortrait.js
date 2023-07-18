import React from 'react';

const UserPortrait = ({ isBlurried, imageUrl, userId, userName }) => {

  const handlePortraitClick = () => {
    window.location.href = `/webapp/perfil?u=${userName}`;
  };

  return (
    <img
      src={imageUrl}
      alt="Retrato do convidado"
      style={{ objectFit: 'cover' }}
      className={`w-24 h-24 ring-1 m-1 ring-purpleT3 rounded-full ${isBlurried ? 'blur-[2px]' : ''}`}
      onClick={handlePortraitClick}
    />
  );
};

export default UserPortrait;
