import React from 'react';
import Image from 'next/image';
import Vector from './Vector';
import Cookies from 'js-cookie';

const ImageInput = ({ image, onChange, partyCode}) => {
  const axios = require('axios');
  const qs = require('qs');

  var token = Cookies.get('token');

  const makeImageRequest = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  };

  const sendImageRequest = async (data) => {
    try {
      const response = await makeImageRequest(process.env.NEXT_PUBLIC_API_URL, data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      onChange(reader.result);

      let formData = new FormData();
      formData.append('request', 'tryToUploadEventImage');
      formData.append('token', token);
      formData.append('code', partyCode);
      formData.append('image', file);

      try {
        console.log(await sendImageRequest(formData));
      } 
      
      catch (error) {
        console.error('Error while uploading image: ', error);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='relative flex w-60 h-60 justify-center content-center items-center bg-purpleT2 rounded-2xl ring-1 ring-inset ring-purpleT4'>
      {!image && (
        <label className='absolute inset-0 flex items-center justify-center cursor-pointer'>
          <input
            className='w-1 h-40 opacity-0'
            type="file"
            accept=".gif, .png, .jpg, .jpeg"
            onChange={handleImageChange}
          ></input>
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
              className='rounded-2xl ring-1 ring-purpleT3'
            />
          </div>
          <button
            className='w-40 h-40 opacity-0 absolute'
            onClick={() => onChange(null)}
          ></button>
        </>
      )}
    </div>
  );
};

export default ImageInput;
