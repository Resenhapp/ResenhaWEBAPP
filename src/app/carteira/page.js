'use client'

import MoneyDisplay from '@/src/components/MoneyDisplay';
import Button from '@/src/components/Button';
import PageHeader from '@/src/components/PageHeader';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import { useState, useEffect } from "react";

export default function Wallet() {
    const token = Cookies.get('token');
    
    if (!token && typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const requested = [
            "username",
            "balances",
            "notified",
            "notifications"
        ];

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token,
            requested: requested
        });

        setData(response);
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNavigation = () => {
        if (typeof window !== 'undefined') {
            window.location.href = `/carteira/saque`;
        }
    };

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { balances } = data;

    return (
        <div className='flex flex-col w-screen h-screen  '>
            <PageHeader pageTitle={'Carteira'} userData={data} />
            <div className="flex flex-col items-center justify-center px-4">
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