'use client'

import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import Dropdown from '@/src/components/Dropdown';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';
import Cookies from 'js-cookie';
import Loading from '@/src/components/Loading';

import React, { useState, useEffect } from 'react';

export default function EditConcierge() {
    const axios = require('axios');
    const qs = require('qs');

    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const [values, setValues] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [conciergeName, setConciergeName] = useState('');
    const [conciergeNewName, setConciergeNewName] = useState(conciergeName);

    var conciergeToken = '';

    var token = Cookies.get('token');

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        conciergeToken = urlParams.get('r');
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        setLoading(true);

        const requested = ["parties"];
        
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token,
            requested: requested
        });
        
        const namesArray = response.parties.made.map(item => item.name);
        const valuesArray = response.parties.made.map(item => item.code);
        
        setOptions(namesArray);
        setValues(valuesArray);
    
        const res = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
            request: 'getConciergeData',
            concierge: conciergeToken
        });

        setConciergeName(res.name);
        setConciergeNewName(res.name);
        setSelectedOption(res.party);

        setLoading(false);
    };

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const handleButtonBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back()
        }
    }

    const handleSaveButton = async () => {
        const data = {
            name: conciergeNewName,
            party: selectedOption
        };

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
            request: 'editConciergeData',
            token: token,
            concierge: conciergeToken,
            data: data
        });
        
        if (!response.error) {
            handleNavigation("recepcionistas");
        }
    }

    const handleInputChange = (e) => {
        setConciergeNewName(e.target.value);
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    const isFilled = conciergeNewName !== '';

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Editar recepcionista'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-col justify-around content-center align-center gap-4 h-full items-center w-full max-w-md p-4">
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Editando recepcionista...</h1>
                            <p className=''>Recepcionistas são as pessoas que vão cuidar da entrada dos seus convidados na sua resenha. Para saber mais <a onClick={handleNavigation("ajuda")}><b>toque aqui</b>.</a></p>
                        </div>
                        <div className='flex flex-col w-full gap-4'>
                            <InputField
                                Icon={'user'}
                                showIcon={true}
                                placeholder={'Nome do recepcionista'}
                                action={handleInputChange}
                                value={conciergeNewName}
                            />
                            <div className='flex flex-col gap-1'>
                                <button onClick={handleModalOpen} className='ml-2 flex flex-row items-center content-center'>
                                    <span>Resenha atribuida</span>
                                    <Vector vectorname={'question01'} />
                                </button>
                                <Dropdown
                                    options={options}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    values={values}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 w-full flex flex-row justify-between'>
                        <button className='px-5 py-4' onClick={handleButtonBack}>Cancelar</button>
                        <Button
                            label={'Salvar'}
                            active={isFilled}
                            icon={'check'}
                            action={handleSaveButton}
                            iconSide='right'
                            height={1}
                            width={3}
                            textAlign='center'
                        />
                    </div>
                </section>
            </div>
            <Modal show={isModalOpen} close={handleModalClose}>
                <h1 className='text-2xl font-bold'>Resenha atribuída:</h1>
                <p className='mb-4'>Um recepcionista atribuído é o responsável por administrar a entrada dos convidados no dia do evento. Isso significa que, durante a resenha, esse indivíduo cuidará do acesso e garantirá uma recepção suave para todos os participantes.</p>
                <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full w-full ring-inset py-2 px-4' onClick={handleModalClose}>Ok, entendi!</button>
            </Modal>
        </div>
    )
}
