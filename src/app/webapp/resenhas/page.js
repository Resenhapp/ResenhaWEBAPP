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

export const metadata = {
    title: 'Resenha.app • Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function HomePage() {
    const username = Cookies.get('username');
    const validator = Cookies.get('validator');

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
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'getUserData',
                username: username,
                validator: validator
            });
            setData(response);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    var { partiesWent, partiesMade } = data

    console.log(partiesMade)

    if (partiesWent.length > 0) {
        const userParty = partiesWent[0];
        var eventNameToUser = userParty.name;
        var eventDateToUser = userParty.date;
        var eventTimeToUser = userParty.time;
        var eventCodeToUser = userParty.code;
        var eventHashToUser = userParty.hash;
    }

    if (partiesMade.length > 0) {
        const userParty = partiesMade[0];
        var eventNameFromUser = userParty.name;
        var eventDateFromUser = userParty.date;
        var eventTimeFromUser = userParty.time;
        var eventConfirmedFromUser = userParty.confirmed;
        var eventCapacityFromUser = userParty.capacity;
        var eventHashFromUser = userParty.hash;
    }

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Resenhas'} />
            <div className="flex flex-col items-center justify-center h-fit px-4">
                <div className='w-[90%] align-center mt-12 justify-between items-center flex flex-row'>
                    <DualButton leftButtonText={'Seus convites'} rightButtonText={'Suas resenhas'} onLeftClick={handleDisplayToggle} onRightClick={handleDisplayToggle} />
                </div>
                {isDisplayingEvents ?
                    <MyInvitesDisplay
                        eventName={eventNameToUser}
                        eventDate={eventDateToUser}
                        eventHour={eventTimeToUser}
                        token={eventCodeToUser}
                        eventImage={`https://media.resenha.app/r/${eventHashToUser}.png`}
                    /> :
                    <MyEventsDisplay
                        eventName={eventNameFromUser}
                        eventDate={eventDateFromUser}
                        eventGuests={eventConfirmedFromUser}
                        eventHour={eventTimeFromUser}
                        eventMax={eventCapacityFromUser}
                        eventImage={`https://media.resenha.app/r/${eventHashFromUser}.png`}
                    />
                }
            </div>
        </div>
    );
}
