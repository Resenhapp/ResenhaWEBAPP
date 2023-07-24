'use client'

import React from 'react';
import Cookies from 'js-cookie';
import PageHeader from '@/src/components/PageHeader';
import DualButton from '@/src/components/DualButton';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';
import Loading from "@/src/components/Loading";

import { useState } from "react";
import { useEffect } from 'react';

export default function HomePage() {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);
    const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);

    const handleDisplayToggle = () => {
        setIsDisplayingEvents(!isDisplayingEvents);
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
                <Loading />
            </div>
        );
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Resenhas'} userData={data} />
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <div className='w-[90%] align-center mt-12 justify-between items-center flex flex-row'>
                    <DualButton leftButtonText={'Seus convites'} rightButtonText={'Suas resenhas'} onLeftClick={handleDisplayToggle} onRightClick={handleDisplayToggle} />
                </div>
                {isDisplayingEvents ?
                    (data.partiesWent.length > 0 ?
                        <MyInvitesDisplay
                            eventName={data.partiesWent[0].name}
                            eventDate={data.partiesWent[0].date}
                            eventHour={data.partiesWent[0].start}
                            eventCode={data.partiesWent[0].code}
                            token={data.partiesWent[0].token}
                            eventImage={`https://media.resenha.app/r/${data.partiesWent[0].hash}.png`}
                        />
                        :
                        <p>SEM RESENHAS</p>)
                    :
                    (data.partiesMade.length > 0 ?
                        <MyEventsDisplay
                            eventName={data.partiesMade[0].name}
                            eventDate={data.partiesMade[0].date}
                            eventGuests={data.partiesMade[0].confirmed}
                            eventHour={data.partiesMade[0].start}
                            eventMax={data.partiesMade[0].capacity}
                            eventCode={data.partiesMade[0].code}
                            eventImage={`https://media.resenha.app/r/${data.partiesMade[0].hash}.png`}
                        />
                        :
                        <p>SEM RESENHAS</p>)
                }
            </div>
        </div>
    );
}
