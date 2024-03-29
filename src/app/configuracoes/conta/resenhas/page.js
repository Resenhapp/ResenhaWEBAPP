'use client'

import PageHeader from '@/src/components/PageHeader';
import PartyBanner from '@/src/components/PartyBanner';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

import React, { useState, useEffect } from 'react';

export default function AccountPartySaved() {
    const token = Cookies.get('token');

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    const handleSaveButton = async (party) => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
        request: 'switchSaveEvent',
        party: party.code,
        token: token,
        });
    };
    
    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };
  
    const fetchData = async () => {
        const requested = [
            "saved"
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

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { saved } = data;

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader pageTitle="Resenhas salvas" isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                {saved.length > 0 ? (saved.map((party) => {
                                    var { hash, price, start, confirmed, capacity, title, code, headers, guests} = party;

                                    const guestsImages = [];

                                    guests.forEach((guest) => {
                                    guestsImages.push(`https://media.resenha.app/u/${guest.hash}.png`);
                                    });

                                    if (headers.length >= 2) {
                                        headers = [headers[0], headers[1]];
                                    }

                                    return (
                                        <PartyBanner
                                            key={hash}
                                            imageUrl={guestsImages}
                                            eventName={title}
                                            eventImage={`https://media.resenha.app/r/${hash}.png`}
                                            eventHour={start}
                                            eventGuests={confirmed}
                                            eventMax={capacity}
                                            eventPrice={price}
                                            eventSaved={'delete'}
                                            eventTags={headers}
                                            eventCode={code}
                                            handleSaveButton={() => handleSaveButton(party)}
                                        />
                                    );
                                })
                                ) : (
                                <p>Você ainda não salvou nenhuma resenha 🤐</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}