import CopyInput from '@/src/components/CopyInput';
import Timer from '@/src/components/Timer';
import Image from 'next/image';

import React, { useEffect } from 'react';

export default function Pix({setPixKey, setPixQrCodeUrl, transactionCharge, setIsFilled}) {
    const axios = require('axios');
    const qs = require('qs');

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };
  
    const getPaymentInfo = async () => {
      const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
        request: 'getTransactionInfo',
        charge: transactionCharge
      });

      if (response.paid == 1) {
        

        setIsFilled(true);
      }
    };
  
    useEffect(() => {
      const interval = setInterval(async () => {
        await getPaymentInfo();
      }, 3000);
    
      return () => {
        clearInterval(interval);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
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