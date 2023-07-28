'use client'

import React from 'react';
import Cookies from 'js-cookie';
import PageHeader from '@/src/components/PageHeader';
import DualButton from '@/src/components/DualButton';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';
import Loading from "@/src/components/Loading";
import Button from '@/src/components/Button';
import { useState } from "react";
import { useEffect } from 'react';

export default function HomePage() {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
    }

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/${pageToGo}`;
        }
    };

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
        const requested = [
            "username",
            "notifications",
            "parties",
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
                    (data.parties.went.length > 0 ?
                        <MyInvitesDisplay
                            eventName={data.parties.went[0].name}
                            eventDate={data.parties.went[0].date}
                            eventHour={data.parties.went[0].start}
                            eventCode={data.parties.went[0].code}
                            token={data.parties.went[0].token}
                            eventImage={`https://media.resenha.app/r/${data.parties.went[0].hash}.png`}
                        />
                        :
                        <section className="flex content-center justify-center flex-col items-center w-full h- max-w-md p-4">
                            <p className='mt-20 text-2xl'>Você ainda não confirmou presença em nenhuma resenha! Toque abaixo pra dar uma olhada no que tá rolando na sua região!</p>
                            <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                                <Button label={'Descobrir Resenhas'} icon={'arrow'} action={() => handleNavigation('feed/')} iconSide='right' height={3} width={1} textAlign='center' />
                            </div>
                        </section>)
                    :
                    (data.parties.made.length > 0 ?
                        <MyEventsDisplay
                            eventName={data.parties.made[0].name}
                            eventDate={data.parties.made[0].date}
                            eventGuests={data.parties.made[0].confirmed}
                            eventHour={data.parties.made[0].start}
                            eventMax={data.parties.made[0].capacity}
                            eventCode={data.parties.made[0].code}
                            eventImage={`https://media.resenha.app/r/${data.parties.made[0].hash}.png`}
                        />
                        :
                        <section className="flex content-center justify-center flex-col items-center w-full h- max-w-md p-4">
                            <p className='mt-20 text-2xl'>Você ainda não criou nenhuma resenha! Bora juntar a galera pra curtir?! Toque abaixo pra criar uma nova resenha!</p>
                            <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                            <Button label={'Nova Resenha'} icon={'plus'} action={() => handleNavigation('novaresenha/')} iconSide='right' height={1} width={1} textAlign='center' />
                            </div>
                        </section>)
                }
            </div>
        </div>
    );
}
