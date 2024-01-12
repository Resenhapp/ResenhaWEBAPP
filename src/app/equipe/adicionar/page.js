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
import CustomSelect from '@/src/components/CustomSelect';

export default function NewCrewMember() {
    const axios = require('axios');
    const qs = require('qs');

    var token = Cookies.get('token');

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [selectedComission, setSelectedComission] = useState('');
    const [options, setOptions] = useState([]);
    const [functions, setFunctions] = useState(['Promoter', 'Recepcionista']);
    const [comissions, setComissions] = useState(['5%', '10%', '15%', '20%', '25%']);
    const [comissionsValues, setComissionsValues] = useState([5, 10, 15, 20, 25]);
    const [functionValues, setFunctionValues] = useState(['promoter', 'concierge']);
    const [usersBeingSearched, setUsersBeingSearched] = useState([]);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [crewMemberName, setCrewMemberName] = useState(false);
    const [currentValue, setCurrentValue] = useState('');

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const handleConciergeInputChange = (e) => {
        setIsFilled(e.target.value !== '');
        setCrewMemberName(e.target.value);   
    };

    const handlePromoterInputChange = (selectedOption) => {
        setCurrentValue(selectedOption ? selectedOption.value : '');
        setCrewMemberName(selectedOption.value);
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

        setLoading(false);
    };

    const handleCreateButton = async () => {
        const data = {
            name: crewMemberName,
            party: selectedOption,
            type: selectedFunction,
            ...(selectedFunction == 'promoter' ? { comission: selectedComission } : {}),
        };

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
            request: 'tryToCreateCrewMember',
            token: token,
            data: data
        });
        
        if (!response.error) {
            handleNavigation("equipe");
        }
    }

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

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Novo recepcionista'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-col justify-around content-center align-center gap-4 h-full items-center w-full max-w-md p-4">
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Adicione um membro para sua equipe!</h1>
                            <p className=''>Membros de equipe são as pessoas que vão cuidar da sua resenha. Para saber mais <a onClick={() => handleNavigation("ajuda")}><b>toque aqui</b>.</a></p>
                        </div>
                        <div className='flex flex-col w-full gap-4'>
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
                                <button onClick={handleModalOpen} className='ml-2 flex flex-row items-center content-center'>
                                    <span>Função atribuida</span>
                                    <Vector vectorname={'question01'} />
                                </button>
                                <Dropdown
                                    options={functions}
                                    selectedOption={selectedFunction}
                                    setSelectedOption={setSelectedFunction}
                                    values={functionValues}
                                />
                                {selectedFunction == 'promoter' ? (
                                    <>
                                        <button onClick={handleModalOpen} className='ml-2 flex flex-row items-center content-center'>
                                        <span>Comissão por venda</span>
                                        <Vector vectorname={'question01'} />
                                        </button>
                                        <Dropdown
                                            options={comissions}
                                            selectedOption={selectedComission}
                                            setSelectedOption={setSelectedComission}
                                            values={comissionsValues}
                                        />
                                    </>
                                    ) : null
                                }
                            </div>
                            {selectedFunction == 'promoter' ? (
                                <CustomSelect
                                    Icon={'user'}
                                    showIcon={true}
                                    placeholder={'Usuário do promoter'}
                                    readOnly={selectedFunction == ''}
                                    action={handlePromoterInputChange}
                                    token={token}
                                    makeRequest={makeRequest}
                                    currentValue={currentValue}
                                />
                                ) : (
                                <InputField
                                    Icon={'user'}
                                    showIcon={true}
                                    placeholder={selectedFunction ? 'Usuário do promoter' : 'Selecione uma função'}
                                    action={handleConciergeInputChange}
                                    readOnly={selectedFunction == ''}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                        <Button
                            label={'Criar membro'}
                            active={true}
                            icon={'plus'}
                            action={handleCreateButton}
                            iconSide='right'
                            height={1}
                            width={1}
                            textAlign='center'
                        />
                    </div>
                </section>
            </div>
            <Modal show={isModalOpen} close={handleModalClose}>
                <h1 className='text-2xl font-bold'>Resenha atribuída:</h1>
                <p className='mb-4'>Um membro de equipe é o responsável por administrar algo para o seu evento.</p>
                <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full w-full ring-inset py-2 px-4' onClick={handleModalClose}>Ok, entendi!</button>
            </Modal>
        </div>
    )
}
