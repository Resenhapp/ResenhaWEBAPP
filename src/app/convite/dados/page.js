'use client';

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

export const metadata = {
    title: 'Resenha.app • Dados',
    description: 'Venha fazer suas resenhas!',
}

export default function Info() {
    const code = Cookies.get('code');

    const options = ['Pix', 'Cartão', 'Dinheiro'];

    const [amount, setAmount] = useState(1);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [method, setMethod] = useState('');
    const [data, setData] = useState(null);
    const [minor, setMinor] = useState(false);

    const handleNextClick = () => {
        const normalizedStr = method.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const formatted = normalizedStr.toLowerCase();

        Cookies.set('name', name);
        Cookies.set('email', email);
        Cookies.set('amount', amount);
        Cookies.set('method', method);
        Cookies.set('minor', minor);
        
        window.location.href = formatted;
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };

    const handleCheckerChange = (event) => {
        const isChecked = event.target.checked;
        setMinor(isChecked);
    };

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
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getInviteData', code: code });
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    const { pricePerItem, month, year, day, confirmed, maxguests, hour, address, host, title, description, dayOfWeek, users } = data;

    const price = pricePerItem * amount;

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className='w-full flex items-start'>
                    <Back />
                </div>
                <div className="flex flex-col mb-0 w-full">
                    <div>
                       <h2 className="text-2xl text-whiteT1 text-center font-bold">Informações</h2>
                        <p className="text-sm text-whiteT1 text-center font-thin mb-4">Antes de continuar, precisamos de algumas informações...</p>
                    </div>
                    <div className='bg-purpleT2 items-center justify-center align-center flex flex-col ring-2 p-2 ring-inset ring-purpleT3 rounded-2xl'>
                        <h2 className="text-xl text-whiteT1 text-left font-bold">Você está comprando:</h2>
                        <div className='flex flex-row'>
                            <div>
                                <p className="text-2md text-whiteT1 text-left font-normal">{title}</p>
                            </div>
                            <div className='flex-row flex gap-2 bg-purpleT1 h-fit rounded-2xl py-1 px-3 ml-4 ring-inset ring-2 ring-purpleT3'>
                                <p className="text-sm text-whiteT1 text-left font-normal">{amount}x</p>
                                <p className="text-sm text-whiteT1 text-left font-bold">R$ {price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 mb-12 gap-4 w-full">
                        <InputField placeholder="Nome" showIcon={true} Icon="person" value={name} action={handleNameChange} />
                        <InputField placeholder="E-mail" showIcon={true} Icon="mail" value={email} action={handleEmailChange} />
                        <div className="flex bg-whiteT1 ring-2 px-4 ring-whiteT2 ring-inset rounded-2xl h-14 flex-row items-center justify-between">
                            <h2 className="text-purpleT2 text-2md font-normal">Entradas</h2>
                            <AmountSelector onChange={handleAmountChange} className="text-purpleT1" />
                        </div>
                        <Checker labelText={`Tenho mais de 18 anos.`} showLabel={true} startChecked={false} action={handleCheckerChange} />
                        <OptionsList showIcon={true} Icon="coin" options={options} action={handleSelectChange} placeholder='Forma de pagamento' />
                    </div>
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <Button label={'Próximo'} icon={'arrow'} action={handleNextClick} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
                <div className="flex items-center justify-end">
                    <p className="mr-1">Tem uma conta?</p>
                    <Link href="/cadastro" className="font-bold">Entre aqui!</Link>
                </div>
            </section>
        </div>
    );
}
