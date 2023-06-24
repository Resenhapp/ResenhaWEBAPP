import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const ImageInput = ({ image, onChange }) => {
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            onChange(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='relative flex w-60 h-60 justify-center content-center items-center bg-purpleT2 rounded-2xl ring-2 ring-inset ring-purpleT4'>
            {!image && (
                <label className='absolute inset-0 flex items-center justify-center cursor-pointer'>
                    <input
                        className='w-1 h-40 opacity-0'
                        type="file"
                        accept=".gif, .png, .jpg, .jpeg"
                        onChange={handleImageChange}
                    >
                    </input>
                    <div className='flex flex-col gap-2 justify-center items-center content-center'>
                        <h1 className='text-center text-sm px-3'>Toque aqui para escolher uma imagem</h1>
                        <Vector vectorname={'plus01'} />
                    </div>
                </label>
            )}
            {image && (
                <>
                    <div className='relative w-60 h-60'>
                        <Image
                            src={image}
                            alt="Selected Image"
                            layout='fill'
                            objectFit='cover'
                            className='rounded-2xl ring-2 ring-purpleT3'
                        />
                    </div>
                    <button
                        className='w-40 h-40 opacity-0 absolute'
                        onClick={() => onChange(null)}
                    >
                    </button>
                </>
            )}
        </div>
    );
};

export default ImageInput;
