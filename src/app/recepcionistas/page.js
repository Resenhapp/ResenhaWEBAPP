'use client'

import React from 'react';
import ConciergePortrait from '@/src/components/ConciergePortrait';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import Loading from "@/src/components/Loading";
import Cookies from 'js-cookie';

import { useState, useEffect } from "react";

export default function Concierges() {
    const axios = require('axios');
    const qs = require('qs');

    const token = Cookies.get('token');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedConcierge, setSelectedConcierge] = useState(null);
    const [data, setData] = useState(null);

    const defaultProfileImage = "https://media.resenha.app/s/ui/concierge_default.jpg";

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
            request: 'getUserData', 
            token: token 
        });
        
        setData(response);
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const removeConcierge = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
            request: 'tryToDeleteConcierge', 
            token: token,
            concierge: selectedConcierge
        });

        if (response.status == "success") {
            setShowDeleteModal(false);
        }
    }

    const handleModalButton = async (conciergeToken) => {
        setShowDeleteModal(!showDeleteModal);
    
        if (!showDeleteModal) {
            setSelectedConcierge(conciergeToken);
        } 
        
        else {
            setSelectedConcierge(null);
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

    var { concierges } = data;

    return (
        <div className='flex flex-col w-screen h-screen'>
            {showDeleteModal && <div className="w-screen h-screen z-[9999] bg-[#00000093] flex backdrop-blur-md absolute items-center content-center justify-center">
                <div className="w-[90%] bg-purpleT0 ring-1 ring-inset ring-purpleT3 rounded-xl p-5">
                    <p className="text-center text-xl font-bold">Você tem certeza de que deseja excluir este recepcionista?</p>
                    <p className="text-center text-sm text-redT3"> (Esta ação não poderá ser desefeita.)</p>
                    <div className="flex flex-col mt-4 items-center content-center justify-center">
                        <button onClick={()=>{setShowDeleteModal(!showDeleteModal)}} className="bg-whiteT1 text-purpleT0 w-fit px-4 py-2 rounded-full font-medium">Não, cancelar</button>
                        <button onClick={() => removeConcierge()} className="bg-transparent text-whiteT1 w-fit px-4 py-2 rounded-full font-medium">Sim, excluir</button>
                    </div>
                    </div>
            </div>}
            <PageHeader pageTitle={'Recepcionistas'} />
           
            <div className="flex flex-col items-center justify-center h-screen px-4 ">
                <section className="flex flex-col w-full max-w-md p-4 ">
                    <div className='h3 w-full flex '>
                        <div className='w-full flex flex-col '>
                            <div className="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                {concierges.length === 0 ? (
                                    <p> Você ainda não possui nenhum recepcionista. Que tal adicionar um tocando abaixo? </p>
                                ) : (
                                    concierges.map((concierge) => (
                                    <div key={concierge.id}>
                                        <ConciergePortrait
                                        imgUrl={defaultProfileImage}
                                        conciergeName={concierge.name}
                                        conciergeToken={concierge.token}
                                        copyAction={() => {
                                            navigator.clipboard.writeText("https://resenha.app/recepcionista?t=" + concierge.token);
                                        }}
                                        relativeEvent={concierge.party}
                                        deleteAction={() => handleModalButton(concierge.token)}
                                        editAction={() => handleNavigation('recepcionistas/editar?r=' + concierge.token)}
                                        />
                                    </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                        <Button label={'Novo recepcionista'} icon={'arrow'} action={() => handleNavigation('recepcionistas/criar')} iconSide='right' height={1} width={1} textAlign='center' />
                    </div>
                </section>
            </div>
        </div>
    );
}