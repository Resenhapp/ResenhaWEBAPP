'use client'

import MoneyDisplay from '@/src/components/MoneyDisplay';
import Button from '@/src/components/Button';
import PageHeader from '@/src/components/PageHeader';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

export const metadata = {
    title: 'Resenha.app • Carteira',
    description: 'Venha fazer suas resenhas!',
}

export default function Wallet() {
    const username = Cookies.get('username');
    const validator = Cookies.get('validator');

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const handleNavigation = () => {
        window.location.href = `/webapp/carteira/saque`;
    };

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
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'getUserData',
                username: username,
                validator: validator
            });
            setData(response);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { balances } = data;

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Carteira'} />
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <MoneyDisplay amount={balances.available} cashType="available" />
                            <MoneyDisplay amount={balances.retained} cashType="secured" />
                            <MoneyDisplay amount={balances.processing} cashType="processing" />
                            <MoneyDisplay amount={balances.requested} cashType="requested" />
                        </div>
                        <div>
                            <Button label={'Solicitar saque'} icon={'arrow'} action={handleNavigation} iconSide='right' height={1} width={1} textAlign='left' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}