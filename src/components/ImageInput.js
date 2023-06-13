import React from 'react';
import Image from 'next/image';

const ImageInput = ({ image, onChange }) => {
    const handleChange = (event) => {
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
        <div className='relative flex w-40 h-40 justify-center content-center items-center bg-whiteT1 rounded-2xl ring-2 ring-inset ring-grayT0'>
            {!image && (
                <label className='absolute inset-0 flex items-center justify-center cursor-pointer'>
                    <input
                        className='w-40 h-40 opacity-0'
                        type="file"
                        accept=".gif, .png, .jpg, .jpeg"
                        onChange={handleChange}
                    >
                    </input>
                    <svg
                        className=''
                        width="60"
                        height="60"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29ZM15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#8E00FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 7.80147C15.3615 7.80147 15.6545 8.09446 15.6545 8.45588V14.3456H21.5442C21.9056 14.3456 22.1986 14.6386 22.1986 15C22.1986 15.3614 21.9056 15.6544 21.5442 15.6544H15.6545V21.5441C15.6545 21.9055 15.3615 22.1985 15 22.1985C14.6386 22.1985 14.3456 21.9055 14.3456 21.5441V15.6544H8.45592C8.0945 15.6544 7.80151 15.3614 7.80151 15C7.80151 14.6386 8.0945 14.3456 8.45592 14.3456H14.3456V8.45588C14.3456 8.09446 14.6386 7.80147 15 7.80147Z" fill="#8E00FF" />
                    </svg>
                </label>
            )}
            {image && (
                <>
                    <div className='relative w-40 h-40'>
                        <Image
                            src={image}
                            alt="Selected Image"
                            layout='fill'
                            objectFit='cover'
                            className='rounded-2xl ring-2 ring-grayT0'
                        />
                    </div>
                    <button
                        className='w-40 h-40 opacity-0 absolute'
                        onClick={() => onChange(null)}
                    >
                        Choose another image
                    </button>
                </>
            )}
        </div>
    );
};

export default ImageInput;
