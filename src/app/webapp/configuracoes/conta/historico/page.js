'use client'

import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import NotificationBase from '@/src/components/NotificationBase';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

export default function AccountHistory() {
    const token = Cookies.get('token');

    // Use the useEffect hook to handle side-effects.
    // This ensures that your redirect logic will only run on the client side.
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
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'getUserData',
                token: token,
                requested: "activity"
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

    var { activity } = data;

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Hist. de atividades" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                {activity.map((item, index) => 
                                    <NotificationBase
                                        key={index}
                                        imageUrl={item.hash ? `https://media.resenha.app/r/${item.hash}.png` : undefined}
                                        title={item.title}
                                        description={item.description}
                                        date={item.date}
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
