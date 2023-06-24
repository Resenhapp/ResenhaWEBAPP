import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const UserProfileEditor = ({currentProfile, onChange}) => {
    const [image, setImage] = React.useState(currentProfile);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
            onChange(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImage(null);
        onChange(null);
    };

    return (
        <div className='relative flex w-44 h-44 justify-center content-center items-center bg-purpleT1 rounded-full ring-2 ring-inset ring-purpleT3'>
            {!image && (
                <label className='absolute inset-0 flex items-center justify-center cursor-pointer'>
                    <input
                        style={{position: 'absolute', width: '100%', height: '100%', opacity: 0}}
                        type="file"
                        accept=".gif, .png, .jpg, .jpeg"
                        onChange={handleImageChange}
                    />
                    <div className='flex flex-col gap-2 justify-center items-center content-center'>
                        <h1 className='text-center text-sm px-3'>Toque aqui para escolher uma imagem</h1>
                        <Vector vectorname={'plus01'} />
                    </div>
                </label>
            )}
            {image && (
                <>
                    <div className='relative w-44 h-44'>
                        <Image
                            src={image}
                            alt="Selected Image"
                            layout='fill'
                            objectFit='cover'
                            className='rounded-full ring-2 ring-purpleT3'
                        />
                    </div>
                    <button
                        className='w-40 h-40 opacity-0 absolute'
                        onClick={clearImage}
                    >
                    </button>
                </>
            )}
            <div className='absolute right-0 top-0 bg-whiteT1 ring-2 ring-whiteT2 ring-inset shadow-lg p-2 rounded-full'>
            <Vector vectorname={'edit01'} />
            </div>
        </div>
    );
};

export default UserProfileEditor;
