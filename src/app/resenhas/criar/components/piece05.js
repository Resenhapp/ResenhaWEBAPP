import React, { useState, useEffect } from 'react';
import ImageInput from '@/src/components/ImageInput';

const Piece05 = ({ filled = true, partyCode }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    filled(image);
  }, [filled, image]);

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };

  return (
    <div className='w-full flex flex-col h-fit gap-3'>
      <div className='w-full content-center flex justify-center'>
        <ImageInput image={image} onChange={handleImageChange} partyCode={partyCode} />
      </div>
    </div>
  );
};

export default Piece05;
