'use client'
import Button from '@/src/components/Button';
import Back from '@/src/components/Back';
import PartyPortrait from '@/src/components/PartyPortrait';
import DefaulEventImage from '@/assets/images/default.jpg'
import PageHeader from '@/src/components/PageHeader';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import { useState } from "react";
import { useEffect } from 'react';

export const metadata = {
    title: 'Resenha.app • Todas as Resenhas',
    description: 'Venha fazer suas resenhas!',
}

export default function MyParties() {
    const username = Cookies.get('username');
    const validator = Cookies.get('validator');

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
                username: username,
                validator: validator,
                requested: "partiesMade"
            });
            setData(response);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const handleViewClick = async (party) => {
        window.location.href = `/webapp/resenhas/detalhes?r=${party.code}`;
    };

    const handleEditClick = async () => {
        
    };

    const handleCopyClick = async (party) => {
        const partyUrl = `https://resenha.app/r/${party.code}`;
    
        await navigator.clipboard.writeText(partyUrl);
    };

    const handleTrashClick = async () => {
        
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

    var { partiesMade } = data

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Suas resenhas'} isBack={true} checker={()=>{null}}/>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Aqui estão todas as suas resenhas</h2>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <div class="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                {partiesMade.map((party) => (
                                    <PartyPortrait
                                        partyCode={party.code} 
                                        partyDate={party.date} 
                                        partyGuests={party.confirmed} 
                                        partyHour={party.time} 
                                        partyMaxGuests={party.capacity} 
                                        partyImage={`https://media.resenha.app/r/${party.hash}.png`} 
                                        partyName={party.name}
                                        viewOnClick={() => handleViewClick(party)}
                                        copyOnClick={() => handleCopyClick(party)}
                                        canBeDeleted={party.confirmed == 0}
                                    />
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
                <Button label={'Criar resenha'} icon={'plus'} action={() => { }} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
            </div>
        </div>
    );
}
