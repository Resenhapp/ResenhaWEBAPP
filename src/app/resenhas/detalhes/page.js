'use client'

import PageHeader from "@/src/components/PageHeader"
import Vector from "@/src/components/Vector"
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';

export default function EventDetails() {
    var token = Cookies.get('token');

    let urlParams = new URLSearchParams();
    var partyCode = '';


    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        partyCode = urlParams.get('r');
    }
    
    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
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
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'getInviteData',
                token: token,
                code: partyCode
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
                <Loading />
            </div>
        );
    }

    if(data.error) {
        return (
            <div className="h-screen w-full flex flex-col justify-between content-center items-center">
                <PageHeader
                pageTitle={'Detalhes'}
                isBack={true}
                checker={() => { null }}
            />
                <h1 className="w-[90%] h-full flex justify-center items-center content-center text-3xl text-center">
                    Desculpe, esta resenha não existe ou foi excluída. 🫤
                </h1>
            </div>
        )
    }

    var { guests, date, income, impressions } = data

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader
                pageTitle={'Detalhes'}
                isBack={true}
                checker={() => { null }}
            />
            <div className="px-8 flex flex-col">
                <div className="mt-8">
                    <p className="font-bold text-lg">Geral</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <p className="text-2xl font-bold">Resenha no terraço</p>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'calendar04'} />Data: </p>
                                <p className="text-lg font-bold">{date.day}/{date.month}/{date.year}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'user04'} />Confirmados: </p>
                                <p className="text-lg font-bold">{guests.confirmed}/{guests.capacity}</p>
                            </div>
                        </div>
                        {/* <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'star02'} />VIPs: </p>
                            <p className="text-lg font-bold">09/10</p>
                        </div> */}
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Faturamento</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'card02'} />Cartão: </p>
                                <p className="text-lg font-bold">R$ {income.card}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'pix01'} />PIX: </p>
                                <p className="text-lg font-bold">R$ {income.pix}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'money03'} />Dinheiro: </p>
                            <p className="text-lg font-bold">R$ {income.cash}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Impressões</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <p className="text-2xl font-bold">Resenha no terraço</p>
                        <div className="flex flex-col gap-1">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye01'} />
                            {impressions.views} impressões</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye02'} />
                            {impressions.clicks} pessoas abriram o convite</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'coin01'} />
                            {impressions.purchases} pessoas compraram entradas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}