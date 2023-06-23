import React, { useState } from 'react';
import ImageInput from '@/src/components/ImageInput';

const Piece05 = ({}) => {
    const [image, setImage] = useState(null);

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };
    return (
        <div className='w-full flex flex-col h-fit gap-3'>
            <div className='w-full content-center flex justify-center'>
            <ImageInput image={image} onChange={handleImageChange} />
            </div>
        </div>
    )
}

export default Piece05;