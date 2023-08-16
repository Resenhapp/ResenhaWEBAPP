import Button from '@/src/components/Button';
import React, { useEffect, useState } from 'react';
import CopyInput from '@/src/components/CopyInput';
import Timer from '@/src/components/Timer';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function Pix({setPixKey, setPixQrCodeUrl, setIsFilled}) {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    var updateInterval = 150;
  
    const makeRequest = async (url, data) => {
      try {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
      } 
      
      catch (error) {
        throw new Error(`Request failed: ${error}`);
      }
    };
  
    const getUserData = async () => {
        try {
          const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getGuestData',
            guest: guest,
            party: 'party'
          });
          
          setNotifications(response.notifications);
        } 
        
        catch (error) {
          console.error(error);
        }
    };
  
    useEffect(() => {
        const interval = setInterval(() => {
            getUserData();
            setShowNotifications(true);
        }, 1000 * updateInterval);
      
        return () => {
            clearInterval(interval);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserData, updateInterval]);
  
  
    const handleClearButton = async () => {
      setShowNotifications(false);
      await clearUserNotifications();
    };

    return(
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
            <div className="flex flex-col mb-0 w-full justify-center content-center items-center">
                <Image
                    alt='pix qr code'
                    src={setPixQrCodeUrl}
                    width={190}
                    height={190}
                    className='rounded-lg p-1 bg-white mt-4'
                />
                    <div className="flex flex-col mt-10 mb-2 gap-4 w-full">
                        <CopyInput value={setPixKey} showIcon={true} Icon={'copy'} />
                    </div>
                    <div className='my-4 w-full'>
                        <Timer timeInMinutes={10} text="O seu tempo para pagar acaba em:" />
                    </div>
                </div>
                <div className="flex flex-col mb-4 w-full">
                </div>
                <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                    <h1 className="font-regular">
                        Saiba <a href="https://resenha.app"><b>como funciona</b></a>
                    </h1>
                </div>
            </section>
        </div>
    )
}