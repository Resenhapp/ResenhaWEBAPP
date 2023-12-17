import InputField from '@/src/components/InputField';
import Button from '@/src/components/Button';
import Link from 'next/link';
import OptionsList from '@/src/components/OptionsList';
import Back from '@/src/components/Back';
import AmountSelector from '@/src/components/AmountSelector';
import Checker from '@/src/components/Checker';
import { useState } from 'react';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Loading from '@/src/components/Loading';

export default function Cash({setIsFilled}) {
    useEffect(() => {
        setIsFilled(true);
    });
    
    return(
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
                
                <div className="flex flex-col mb-0 w-full">
                </div>
                <div className='flex flex-col gap-4 my-8'>
                    <h1 className='text-xl text-center'>
                        Na tela a seguir, você receberá um comprovante de confirmação da sua presença na resenha.
                    </h1>
                    <h1 className='text-xl text-center'>
                        Quando chegar na resenha, tenha o QR Code apresentado ou o código que estará no mesmo comprovante, você terá que apresetá-lo no dia da resenha.
                    </h1>
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