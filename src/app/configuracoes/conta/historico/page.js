'use client'

import PageHeader from '@/src/components/PageHeader';
import NotificationBase from '@/src/components/NotificationBase';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

import React, { useState, useEffect } from 'react';

export default function AccountHistory() {
    const token = Cookies.get('token');

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    if (!token) {
        if (typeof window !== 'undefined') { 
            window.location.href = '/login';
        }
    }

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token
        });

        setData(response);
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

    var { activities } = data;

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Hist. de atividades" userData={data} />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                            {activities.length > 0 ? (
                                activities.map((item, index) => (
                                    <NotificationBase
                                        key={index}
                                        imageUrl={item.hash ? `https://media.resenha.app/r/${item.hash}.png` : undefined}
                                        title={item.title}
                                        description={item.description}
                                        date={item.date}
                                    />
                                ))
                            ) : (
                                <p>Você ainda não realizou atividades 😔</p>
                            )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
