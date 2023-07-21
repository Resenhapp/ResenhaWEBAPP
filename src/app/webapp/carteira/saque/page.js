'use client'
import React, { useState, useRef } from 'react';
import Button from '@/src/components/Button';
import MoneyInput from '@/src/components/MoneyInput';
import WithdrawError from '@/src/components/WithdrawError';
import PageHeader from '@/src/components/PageHeader';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";

export default function Withdraw() {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
      }

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);
    const [errorContent, setErrorContent] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const inputRef = useRef(null);

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
                const response = await makeRequest('http://localhost/resenha.app/api/', { 
                    request: 'tryToWithdraw', 
                    token: token,
                    amount: withdrawalAmount
                });

                if (!response.error && typeof window !== 'undefined') {
                    window.location.href = `/webapp/carteira/saque/sucesso?a=${withdrawalAmount}`;
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
        try {
            const response = await makeRequest('http://localhost/resenha.app/api/', { 
                request: 'getUserData', 
                token: token
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
    
    const isWithdrawalValid = withdrawalAmount >= 50 && withdrawalAmount <= parseFloat(avaliableCash.replace(',', '.'));

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Saque'} userData={data} />
            <div className="flex flex-col  justify-start h-screen px-4 ">
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
                            {errorContent && <WithdrawError errorContent={errorContent} key={new Date().getTime()} />} {/* Error message will only be displayed if errorContent is not null */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
