'use client';

import Button from '@/src/components/Button';
import CopyInput from '@/src/components/CopyInput';
import Timer from '@/src/components/Timer';
import Back from '@/src/components/Back';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from "react";
import Cookies from 'js-cookie';

export const metadata = {
    title: 'Resenha.app • Pix',
    description: 'Venha fazer suas resenhas!',
}

export default function Pix() {
    const [data, setData] = useState(null);

    const code = Cookies.get('code');
    const name = Cookies.get('name');
    const email = Cookies.get('email');
    const minor = Cookies.get('minor');
    const method = Cookies.get('method').toLowerCase();

    const amount = Cookies.get('amount');

    useEffect(() => {
        fetchData();
    }, []);

    const axios = require('axios');
    const qs = require('qs');

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        } 
        
        catch (error) {
            throw new Error(`Request failed: ${error}`);
        }
    };

    const fetchData = async () => {
        try {
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'tryToCreateGuest', method: method, code: code, name: name, birth: minor, email: email});
            console.log(response);
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    const { qrcode } = data;

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
            <div className='w-full flex items-start'>
                    <Back/>
                </div>
                <div className="mb-4">
                    <svg width="56" height="54" viewBox="0 0 56 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.9507 41.0592C42.8495 41.0631 41.7584 40.8565 40.7405 40.4514C39.7225 40.0464 38.798 39.4509 38.0202 38.6993L29.4537 30.4352C29.1507 30.1559 28.7476 30 28.3284 30C27.9091 30 27.5061 30.1559 27.2031 30.4352L18.6076 38.722C17.8303 39.4746 16.906 40.0713 15.8881 40.4776C14.8701 40.8838 13.7788 41.0916 12.6771 41.0889H11L21.8551 51.5541C23.4832 53.1204 25.6892 54 27.9891 54C30.2891 54 32.4951 53.1204 34.1232 51.5541L45 41.0662L43.9507 41.0592Z" fill="#F5F5F5" />
                        <path d="M12.6798 12.9011C13.7821 12.8982 14.874 13.1059 15.8925 13.512C16.911 13.918 17.8358 14.5145 18.6135 15.2669L27.2135 23.5518C27.5124 23.8388 27.9173 24 28.3394 24C28.7615 24 29.1664 23.8388 29.4653 23.5518L38.0346 15.2983C38.8116 14.545 39.7362 13.9478 40.7548 13.5413C41.7734 13.1349 42.8657 12.9273 43.9682 12.9307H45L34.1174 2.44912C33.3115 1.67267 32.3548 1.05675 31.3017 0.636518C30.2486 0.216291 29.1199 0 27.9801 0C26.8402 0 25.7115 0.216291 24.6585 0.636518C23.6054 1.05675 22.6486 1.67267 21.8428 2.44912L11 12.9011H12.6798Z" fill="#F5F5F5" />
                        <path d="M53.5076 21.2208L47.0619 15.0273C46.9165 15.0844 46.7612 15.1145 46.6041 15.1159H43.6731C42.1479 15.1196 40.6858 15.7016 39.6048 16.7355L31.2056 24.8008C30.4492 25.5263 29.4241 25.9338 28.3553 25.9338C27.2865 25.9338 26.2614 25.5263 25.505 24.8008L17.0739 16.7048C15.9931 15.6703 14.5311 15.0877 13.0056 15.0835H9.40745C9.25916 15.0803 9.11262 15.052 8.97453 15L2.48796 21.2208C0.894764 22.7549 0 24.8336 0 27.0009C0 29.1681 0.894764 31.2468 2.48796 32.7809L8.96034 39C9.09813 38.947 9.24485 38.9187 9.39325 38.9165H13.0056C14.531 38.9122 15.993 38.3295 17.0739 37.2952L25.5032 29.1958C27.0273 27.7331 29.6833 27.7331 31.2056 29.1958L39.6048 37.2645C40.6858 38.2984 42.1479 38.8804 43.6731 38.8841H46.6041C46.7612 38.8851 46.9166 38.9152 47.0619 38.9727L53.5076 32.7792C54.2978 32.0203 54.9246 31.1192 55.3522 30.1274C55.7799 29.1357 56 28.0727 56 26.9991C56 25.9256 55.7799 24.8626 55.3522 23.8709C54.9246 22.8791 54.2978 21.978 53.5076 21.2191" fill="#F5F5F5" />
                    </svg>
                </div>
                <div className="flex flex-col mb-0 w-full">
                    <div>
                        <h2 className="text-2xl text-whiteT1 text-center font-bold">Pagamento com pix</h2>
                        <p className="text-sm text-whiteT1 text-center font-thin mb-2">Copie o código abaixo e cole no aplicativo do seu banco para efetuar o pagamento.</p>
                    </div>
                    <div className="flex flex-col mt-12 mb-2 gap-4 w-full">
                        <CopyInput value={qrcode} showIcon={true} Icon={'copy'} />
                    </div>
                    <div className='my-12'>
                        <Timer timeInMinutes={10} text="O seu tempo para pagar acaba em:" />
                    </div>
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <Button label="Copiar" icon="" />
                </div>
                <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                    <h1 className="font-regular">
                        Saiba <a href="https://resenha.app"><b>como funciona</b></a>
                    </h1>
                </div>
            </section>
        </div>
    );
}
