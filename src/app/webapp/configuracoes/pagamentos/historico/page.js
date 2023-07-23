'use client'

import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import NotificationBase from '@/src/components/NotificationBase';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';
import {apiUrl} from '@/src/components/globalVariables';
import {imageUrlPrefix} from '@/src/components/globalVariables';

export default function BuyHistory() {

    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            if (typeof window !== 'undefined') { 
                window.location.href = '/login';
            }
        }
    }, [token]);

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

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
            const response = await makeRequest({apiUrl}, {
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

    var { purchases } = data;

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Hist. de compras" userData={data} />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                {purchases.map((purchase) => 
                                    <NotificationBase
                                        key={purchase.id}
                                        imageUrl={purchase.hash ? `https://media.resenha.app/r/${purchase.hash}.png` : undefined}
                                        title={'Compra de entrada'}
                                        description={`Você pagou R$ ${purchase.price} pela entrada da ${purchase.name}. Seu código é ${purchase.code}`}
                                        date={purchase.date}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}