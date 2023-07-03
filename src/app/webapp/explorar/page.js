'use client'

import Button from '@/src/components/Button';
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Accordion from '@/src/components/Accordion';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import SearchInput from '@/src/components/SearchInput';
import FeedDualButton from '@/src/components/FeedDualButton';
import MyInvitesDisplay from '@/src/components/MyInvitesDisplay';
import MyEventsDisplay from '@/src/components/MyEventsDisplay';
import PartyBanner from '@/src/components/PartyBanner';

export const metadata = {
    title: 'Resenha.app • Explorar',
    description: 'Venha fazer suas resenhas!',
}

export default function Help() {
    const id = Cookies.get('user');

    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const axios = require('axios');
    // const qs = require('qs');

    // const makeRequest = async (url, data) => {
    //     try {
    //         const response = await axios.post(url, qs.stringify(data));
    //         return response.data;
    //     }

    //     catch (error) {
    //         throw new Error(`Request failed: ${error}`);
    //     }
    // };

    // const fetchData = async () => {
    //     try {
    //         const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getFeedData'});
    //         setData(response);
    //     }

    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    // if (!data) {
    //     return (
    //         <div className="h-screen w-full flex justify-center content-center items-center">
    //             <Loading/>
    //         </div>
    //     );
    // }

    const exampleNameEvent = "BAILE FUNK NA...";
    const exampleDateEvent = "16/09/2023";
    const exampleHourEvent = "20";
    const exampleGuestsEvent = "10";
    const exampleLimitEvent = "100";
    const exampleImageEvent = "https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png";
    const examplePriceEvent = 100;
    const exampleSavedEvent = false;
    
    const [isDisplayingEvents, setIsDisplayingEvents] = useState(true);
    
    const handleDisplayToggle = () => {
        setIsDisplayingEvents(!isDisplayingEvents);
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
          <PageHeader pageTitle={'Explorar'} />
          <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4">
              <div className='h3 w-full flex'>
                <div className='w-full flex flex-col'>
                  <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                    <div className="flex flex-col mb-4 gap-4 w-full">
                      <SearchInput placeholder={"Busque por nome ou tag"}/>
                      <FeedDualButton leftButtonText={"Todas"} rightButtonText={"Em alta"} onRightClick={handleDisplayToggle} onLeftClick={handleDisplayToggle}/>
                      <div className='w-full h-full flex flex-col'>
                        <PartyBanner eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} />
                        <PartyBanner eventName={exampleNameEvent} eventImage={exampleImageEvent} eventDate={exampleDateEvent} eventHour={exampleHourEvent} eventGuests={exampleGuestsEvent} eventMax={exampleLimitEvent} eventPrice={examplePriceEvent} eventSaved={exampleSavedEvent} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
    );
}