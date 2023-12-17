'use client'

import Button from '@/src/components/Button';
import MoneyInput from '@/src/components/MoneyInput';
import WithdrawError from '@/src/components/WithdrawError';
import PageHeader from '@/src/components/PageHeader';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

import React, { useState, useRef } from 'react';

import { useEffect } from 'react';

export default function Withdraw() {
    const token = Cookies.get('token');

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);
    const [errorContent, setErrorContent] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0.0);
    const inputRef = useRef(null);

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
    }

    const handleWithdraw = async () => {
        const availableAmount = parseFloat(avaliableCash.replace(',', '.'));

        if (withdrawalAmount < 50) {
            setErrorContent(null);
            setTimeout(() => setErrorContent('O valor mínimo de saque é de R$ 50,00.'), 0);
        } 
        
        else if (withdrawalAmount > availableAmount) {
            setErrorContent(null);
            setTimeout(() => setErrorContent('Saldo insuficiente.'), 0);
        } 
        
        else {
            setErrorContent(null);

            try {
                const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
                    request: 'tryToWithdraw', 
                    token: token,
                    amount: withdrawalAmount
                });

                if (!response.error && typeof window !== 'undefined') {
                    window.location.href = `/carteira/saque/sucesso?a=${withdrawalAmount}`;
                }
            }
    
            catch (error) {
                console.error(error);
            }
        }
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
        const requested = [
            "username",
            "name",
            "cpf",
            "balances",
            "notified",
            "notifications"
        ];

        try {
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
                request: 'getUserData', 
                token: token,
                requested: requested
            });
            
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { name, cpf, balances} = data;

    var avaliableCash = balances.available;
    
    var avaliableCashNumber = parseFloat(avaliableCash.replace('.', '').replace(',', '.'));
    const isWithdrawalValid = withdrawalAmount >= 50 && withdrawalAmount <= avaliableCashNumber;

    return (
        <div className='flex flex-col w-screen h-screen items-center content-center'>
            <PageHeader pageTitle={'Saque'} userData={data} />
            <div className="flex flex-col w-full justify-start h-screen px-4 items-center content-center">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <div className='w-full h-fit bg-purpleT2 rounded-2xl ring-1 ring-inset ring-purpleT3 p-4'>
                                <h1 className='font-bold text-2xl'>Dados bancários</h1>
                                <h1 className=''><b>Conta: </b>{cpf}</h1>
                                <h1 className=''><b>Nome: </b>{name}</h1>
                            </div>
                            <div className='w-full'>
                                <div>
                                <h1 className='w-full p-1 text-sm'>Digite abaixo o valor que você deseja sacar:</h1>
                                </div>
                                <div className='w-full h-fit ring-inset ring-1 flex flex-row gap-2 ring-purpleT3 bg-purpleT2 rounded-2xl p-4 '>
                                    R$<MoneyInput ref={inputRef} onChange={(val) => setWithdrawalAmount(parseFloat(val.replace('.', '').replace(',', '.')))} />
                                </div>
                                <p className='text-whiteT1 w-full text-left text-sm p-1'>{'Valor disponível: R$ ' + avaliableCash}</p>
                            </div>
                        </div>
                        <div>
                            <Button label={'Solicitar saque'} icon={'arrow'} action={handleWithdraw} iconSide='right' height={1} width={1} textAlign='left' active={isWithdrawalValid} />
                            {errorContent && <WithdrawError errorContent={errorContent} key={new Date().getTime()} />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
