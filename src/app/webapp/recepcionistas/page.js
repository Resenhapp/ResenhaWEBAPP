'use client'
import React from 'react';
import ConciergePortrait from '@/src/components/ConciergePortrait';
import PopUp from '@/src/components/popUp';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

export const metadata = {
    title: 'Resenha.app • Recepcionistas',
    description: 'Venha fazer suas resenhas!',
}
export default function Concierges() {
    function RemoveConcierge() {

    }

    const defaultProfileImage = "https://resenha.app/publico/recursos/imagens/concierge_default.png";

    const id = Cookies.get('user');

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const axios = require('axios');
    const qs = require('qs');

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
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getUserData', id: id });
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { concierges } = data;

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Recepcionistas'} />
            <PopUp icon={'question'} iconColor={'purple'} onActionClick={RemoveConcierge()} title={'Excluir recepcionista?'}
                text={`Você tem certeza de que quer excluir TESTE da lista de Recepcionistas? `}
                actionTitle={'Excluir'} buttonColor={'red'} showStatus={false}/>
            <div className="flex flex-col items-centser justify-center h-screen px-4 ">
                <section className="flex flex-col w-full max-w-md p-4 ">
                    <div className='h3 w-full flex '>
                        <div className='w-full flex flex-col '>
                            <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                {concierges.map((concierge) => (
                                    <ConciergePortrait
                                        imgUrl={defaultProfileImage}
                                        activeStatus={true}
                                        conciergeName={concierge.name}
                                        conciergeToken={concierge.token}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                    <Button label={'Novo recepcionista'} icon={'arrow'} action={() => window.open("", "_blank")} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
                </section>
            </div>
        </div>
    );
}
