'use client'

import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import EditInfoPage from '@/src/components/EditInfoPage';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

export default function AccountInfo() {
    const token = Cookies.get('token');
    
    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    const axios = require('axios');
    const qs = require('qs');

    const [isEditNamePageOpen, setIsEditNamePageOpen] = useState(false);
    const [isEditBirthdayPageOpen, setIsEditBirthdayPageOpen] = useState(false);
    const [isEditPhonePageOpen, setIsEditPhonePageOpen] = useState(false);
    const [isEditAddressPageOpen, setIsEditAddressPageOpen] = useState(false);
    const [isEditCpfPageOpen, setIsEditCpfPageOpen] = useState(false);

    const [name, setName] = useState('');
    const [tempName, setTempName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [tempBirthday, setTempBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [address, setAddress] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [cpf, setCpf] = useState('');
    const [tempCpf, setTempCpf] = useState('');
    const [data, setData] = useState(null);

    const toggleEditNamePageOpen = () => {
        setTempName(name);
        setIsEditNamePageOpen(!isEditNamePageOpen);
    };

    const toggleEditBirthdayPageOpen = () => {
        setIsEditBirthdayPageOpen(!isEditBirthdayPageOpen);
        setTempBirthday(birthday);
    };

    const toggleEditPhonePageOpen = () => {
        setIsEditPhonePageOpen(!isEditPhonePageOpen);
        setTempPhone(phone);
    };

    const toggleEditAddressPageOpen = () => {
        setIsEditAddressPageOpen(!isEditAddressPageOpen);
        setTempAddress(address);
    };

    const toggleEditCpfPageOpen = () => {
        setIsEditCpfPageOpen(!isEditCpfPageOpen);
        setTempCpf(cpf);
    };

    const handleNameChange = (event) => {
        setTempName(event.target.value);
    };

    const handleBirthdayChange = (event) => {
        setTempBirthday(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setTempPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setTempAddress(event.target.value);
    };

    const handleCpfChange = (event) => {
        setTempCpf(event.target.value);
    };

    const saveName = async () => {
        setName(tempName);

        const data = {
            name: tempName
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditNamePageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const saveBirthday = async () => {
        setBirthday(tempBirthday);

        const data = {
            birth: tempBirthday
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditBirthdayPageOpen();

            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const savePhone = async () => {
        setPhone(tempPhone);

        const data = {
            phone: tempPhone
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditPhonePageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const saveAddress = async () => {
        setAddress(tempAddress);

        const data = {
            address: tempAddress
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditAddressPageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const saveCpf = async () => {
        setCpf(tempCpf);

        const data = {
            address: tempAddress
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditCpfPageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const cancelEditName = () => {
        setTempName(name);
        toggleEditNamePageOpen();
    };

    const cancelEditBirthday = () => {
        setTempBirthday(birthday);
        toggleEditBirthdayPageOpen();
    };

    const cancelEditPhone = () => {
        setTempPhone(phone);
        toggleEditPhonePageOpen();
    };

    const cancelEditAddress = () => {
        setTempAddress(address);
        toggleEditAddressPageOpen();
    };

    const cancelEditCpf = () => {
        setTempCpf(cpf);
        toggleEditCpfPageOpen();
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

    const sendEditRequest = async (data) => {
        try {
          const response = await makeRequest('https://api.resenha.app/', {
            request: 'editUserData',
            token: token,
            data: data
          });
      
          return response;
        } 
        
        catch (error) {
          console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await makeRequest('https://api.resenha.app/', {
                request: 'getUserData',
                token: token
            });

            setData(response);

            setName(response.name);
            setAddress(response.address);
            setBirthday(response.birth);
            setPhone(response.phone);
            setCpf(response.cpf);
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
                <Loading/>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Informações pessoais" />
            <EditInfoPage
                isOpen={isEditNamePageOpen}
                pageTitle={'Nome'}
                togglePage={toggleEditNamePageOpen}
                saveAction={saveName}
                cancelAction={cancelEditName}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome'
                        value={tempName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O seu nome é o que as pessoas verão quando entrarem no seu perfil.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditBirthdayPageOpen}
                pageTitle={'Data de nascimento'}
                togglePage={toggleEditBirthdayPageOpen}
                saveAction={saveBirthday}
                cancelAction={cancelEditBirthday}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Data de nascimento'
                        value={tempBirthday}
                        onChange={handleBirthdayChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira sua data de nascimento.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditPhonePageOpen}
                pageTitle={'Telefone'}
                togglePage={toggleEditPhonePageOpen}
                saveAction={savePhone}
                cancelAction={cancelEditPhone}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Telefone'
                        value={tempPhone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu número de telefone.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditAddressPageOpen}
                pageTitle={'Endereço'}
                togglePage={toggleEditAddressPageOpen}
                saveAction={saveAddress}
                cancelAction={cancelEditAddress}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Endereço'
                        value={tempAddress}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu endereço.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditCpfPageOpen}
                pageTitle={'CPF'}
                togglePage={toggleEditCpfPageOpen}
                saveAction={saveCpf}
                cancelAction={cancelEditCpf}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='CPF'
                        value={tempCpf}
                        onChange={handleCpfChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu CPF.
                    </p>
                </div>
            </EditInfoPage>
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div onClick={toggleEditNamePageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Nome</p>
                                    <InputFieldPurple value={name} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditBirthdayPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Data de Nascimento</p>
                                    <InputFieldPurple value={birthday} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditPhonePageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Telefone</p>
                                    <InputFieldPurple value={phone} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditAddressPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Endereço</p>
                                    <InputFieldPurple value={address} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditCpfPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">CPF</p>
                                    <InputFieldPurple value={cpf} readOnly={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
