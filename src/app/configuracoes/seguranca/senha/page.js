'use client'
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import ConfigDropDown from '@/src/components/ConfigDropDown';
import EditInfoPage from '@/src/components/EditInfoPage';
import Cookies from 'js-cookie';

import React, {useEffect, useState} from 'react';

export default function PasswordConfig() {
    const token = Cookies.get('token');

    // if (!token) {
    //     // Redirect to login page on the client side
    //     // window.location.href = '/login';
    // }

    const axios = require('axios');
    const qs = require('qs');

    const options = ['Desabilitado']
    var initialPassword = '•••••••'
    
    const [isEditPasswordPageOpen, setIsEditPasswordPageOpen] = useState(false);
    const [password, setPassword] = useState(initialPassword);
    const [tempPassword, setTempPassword] = useState(initialPassword);

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setTempPassword(event.target.value);
    };

    const toggleEditPasswordPageOpen = () => {
        setIsEditPasswordPageOpen(!isEditPasswordPageOpen);
        setTempPassword(password);
    };

    const savePassword = async () => {
        setPassword(tempPassword);

        const data = {
            password: tempPassword
        };
    
        const response = await sendEditRequest(data);
    
        if (response.token) {
            Cookies.set('token', response.token);
        }

        if (!response.error) {
            toggleEditPasswordPageOpen();
        }
    };

    const [data, setData] = useState(null);
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
    
    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Config. de senha" />
            <EditInfoPage
                isOpen={isEditPasswordPageOpen}
                pageTitle={'Alterar a senha'}
                togglePage={toggleEditPasswordPageOpen}
                saveAction={savePassword}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nova senha'
                        value={tempPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                       Insira aqui sua nova senha
                    </p>
                </div>
            </EditInfoPage>
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div onClick={toggleEditPasswordPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Senha</p>
                                    <InputFieldPurple value={password} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Autenticação de dois fatores (2FA)</p>
                                <ConfigDropDown 
                                    options={options}
                                    defaultOption={options[0]}
                                    action={handleSelectChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
