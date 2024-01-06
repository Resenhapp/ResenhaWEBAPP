'use client'

import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import EditInfoPage from '@/src/components/EditInfoPage';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import Confirmed from '@/src/components/Confirmed';
import ReactInputMask from 'react-input-mask';

import React, { useState, useEffect } from 'react';

export default function AccountInfo() {
    const token = Cookies.get('token');

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
    const [verified, setVerified] = useState(false);

    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    const toggleEditNamePageOpen = () => {
        if (!verified) {
            setTempName(name);
            setIsEditNamePageOpen(!isEditNamePageOpen);
        }
    };

    const toggleEditBirthdayPageOpen = () => {
        if (!verified) {
            setIsEditBirthdayPageOpen(!isEditBirthdayPageOpen);
            setTempBirthday(birthday);
        }
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
        if (!verified) {
            setIsEditCpfPageOpen(!isEditCpfPageOpen);
            setTempCpf(cpf);
        }
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

        const response = await sendEditRequest(data);

        if (!response.error) {
            toggleEditNamePageOpen();
        }
    };

    const saveBirthday = async () => {
        setBirthday(tempBirthday);

        const data = {
            birth: tempBirthday
        };

        const response = await sendEditRequest(data);

        if (!response.error) {
            toggleEditBirthdayPageOpen();

        }
    };

    const savePhone = async () => {
        setPhone(tempPhone);

        const data = {
            phone: tempPhone
        };

        const response = await sendEditRequest(data);

        if (!response.error) {
            toggleEditPhonePageOpen();
        }
    };

    const saveAddress = async () => {
        setAddress(tempAddress);

        const data = {
            address: tempAddress
        };

        const response = await sendEditRequest(data);

        if (!response.error) {
            toggleEditAddressPageOpen();
        }
    };

    const saveCpf = async () => {
        setCpf(tempCpf);

        const data = {
            cpf: tempCpf
        };

        const response = await sendEditRequest(data);

        if (!response.error) {
            toggleEditCpfPageOpen();
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
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const sendEditRequest = async (data) => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'editUserData',
            token: token,
            data: data
        });

        return response;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token
        });

        setData(response);

        setName(response.name);
        setAddress(response.address);
        setBirthday(response.birth);
        setPhone(response.phone);
        setCpf(response.cpf);
        setVerified(response.verified);
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
                    <ReactInputMask
                        mask="99/99/9999"
                        maskChar=""
                        value={tempBirthday}
                        onChange={handleBirthdayChange}
                    >
                        {(inputProps) =>
                            <input
                                {...inputProps}
                                className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                                maxLength={10}
                                placeholder='Data de nascimento'
                                type='tel'
                            />
                        }
                    </ReactInputMask>
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
                    <ReactInputMask
                        mask="(99) 9 9999-9999"
                        maskChar=""
                        value={tempPhone}
                        onChange={handlePhoneChange}
                    >
                        {(inputProps) =>
                            <input
                                {...inputProps}
                                className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                                placeholder='Telefone'
                                type='tel'
                            />
                        }
                    </ReactInputMask>

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
                    <ReactInputMask
                        mask="999.999.999-99"
                        maskChar=""
                        value={tempCpf}
                        onChange={handleCpfChange}
                    >
                        {(inputProps) =>
                            <input
                                {...inputProps}
                                className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                                placeholder='CPF'
                            />
                        }
                    </ReactInputMask>

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
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-whiteT1 text-sm font-semibold">Nome</p>
                                        <Confirmed initialConfirmation={verified} />
                                    </div>
                                    <InputFieldPurple value={name} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditBirthdayPageOpen}>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-whiteT1 text-sm font-semibold">Data de Nascimento</p>
                                        <Confirmed initialConfirmation={verified} />
                                    </div>
                                    <InputFieldPurple value={birthday} readOnly={true} placeholder={'14/05/1984'} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditPhonePageOpen}>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-whiteT1 text-sm font-semibold">Telefone</p>
                                    </div>
                                    <InputFieldPurple value={phone} readOnly={true} placeholder={'(01) 9 2345-6789'} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditAddressPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Endereço</p>
                                    <InputFieldPurple value={address} readOnly={true} placeholder={'Rua do James da Salada de Fruta'} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditCpfPageOpen}>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-whiteT1 text-sm font-semibold">CPF</p>
                                        <Confirmed initialConfirmation={verified} />
                                    </div>
                                    <InputFieldPurple value={cpf} readOnly={true} placeholder={'123.231.312-00'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
