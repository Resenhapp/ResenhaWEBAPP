'use client'

import Button from '@/src/components/Button';
import Back from '@/src/components/Back';
import PartyPortrait from '@/src/components/PartyPortrait';
import DefaulEventImage from '@/assets/images/default.jpg'
import PageHeader from '@/src/components/PageHeader';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import { useState, useEffect } from "react";

export default function MyParties() {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
    }

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

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
            const requested = [
                "username",
                "notifications",
                "parties"
            ];

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

    const handleViewClick = async (party) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/resenhas/detalhes?r=${party.code}`;
        }
    };

    const handleEditClick = async (party) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/resenhas/editar?r=${party.code}`;
        }
    };

    const handleCopyClick = async (party) => {
        const partyUrl = `https://resenha.app/convite?c=${party.code}`;
    
        const copyData = {
            text: `Que tal colar na minha resenha? Só confirmar pelo link: `,
            url: `${partyUrl}`,
        };
    
        const fullTextToCopy = `${copyData.text}${copyData.url}`;
        
        await navigator.clipboard.writeText(fullTextToCopy);
    };
    

    const handleTrashClick = async (party) => {
        try {
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'tryToDeleteEvent',
                token: token,
                code: party.code
            });
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

    var { parties } = data

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Suas resenhas'} isBack={true} checker={()=>{null}} userData={data}/>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-start items-center w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full align-center justify-between items-center mb-4 flex flex-row'>
                                <h2>Aqui estão todas as suas resenhas</h2>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <div className="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                {parties.made.map((party) => (
                                    <div key={party.id}>
                                        <PartyPortrait
                                            partyCode={party.code} 
                                            partyDate={party.date} 
                                            partyGuests={party.confirmed} 
                                            partyHour={party.start} 
                                            partyMaxGuests={party.capacity} 
                                            partyImage={`https://media.resenha.app/r/${party.hash}.png`} 
                                            partyName={party.name}
                                            viewOnClick={() => handleViewClick(party)}
                                            editOnClick={() => handleEditClick(party)}
                                            copyOnClick={() => handleCopyClick(party)}
                                            trashOnClick={() => handleTrashClick(party)}
                                            canBeDeleted={party.confirmed == 0}
                                        />
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="flex flex-col mb-4 w-[90%] mt-8 items-center justify-center content-center">
                <Button label={'Criar resenha'} icon={'plus'} action={() => handleNavigation('resenhas/criar/')} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
            </div>
        </div>
    );
}
