'use client'

import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import EditInfoPage from '@/src/components/EditInfoPage';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import Confirmed from '@/src/components/Confirmed';

export default function AccountDetails() {
    const token = Cookies.get('token');
    
    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    const [isUsernameErrorVisible, setIsUsernameErrorVisible] = useState(false);
    const [errorIndex, setErrorIndex] = useState(null);
    const errors = [
        "0",
        "O nome de usuário deve ter pelo menos 5 caracteres.",
        "O nome de usuário deve começar com uma letra e pode conter apenas letras, números e sublinhados (_).",
        "Este nome de usuário já existe.",
        "O nome de usuário não pode ficar vazio",
        "O seu nome não pode ficar vazio",
      ];

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const [isEditNamePageOpen, setIsEditNamePageOpen] = useState(false);
    const [isEditEmailPageOpen, setIsEditEmailPageOpen] = useState(false);

    const [name, setName] = useState('');
    const [tempName, setTempName] = useState('');

    const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');

    const toggleEditNamePageOpen = () => {
        setIsEditNamePageOpen(!isEditNamePageOpen);
        setTempName(name);
    };
    const toggleEditEmailPageOpen = () => {
        setIsEditEmailPageOpen(!isEditEmailPageOpen);
        setTempEmail(email);
    };

    const handleNameChange = (event) => {
        setTempName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setTempEmail(event.target.value);
    }

    const saveName = async () => {
        setName(tempName);

        const data = {
            username: tempName
        };
    
        try {
            const response = await sendEditRequest(data);
      
            if (response.token) {
                Cookies.set('token', response.token);
            }
            
            if (response.error) {
                if (response.error === "used_username") {
                    setErrorIndex(3);
                    setIsUsernameErrorVisible(true);
                }
            }

            if (!response.error) {
                toggleEditNamePageOpen();
            }

            
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const saveEmail = async () => {
        setEmail(tempEmail);

        const data = {
            email: tempEmail
        };
    
        try {
            const response = await sendEditRequest(data);
    
            if (!response.error) {
                toggleEditEmailPageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
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
          const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
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
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'getUserData',
                token: token
            });

            setData(response);

            setName(response.username);
            setEmail(response.email);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        
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
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Detalhes da conta" userData={data}/>
            <EditInfoPage
                isOpen={isEditNamePageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditNamePageOpen}
                saveAction={saveName}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome de usuário'
                        value={tempName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                    Seu nome de usuário é um identificador importante. O seu nome de usuário é unico e só pode ser utilizado por você.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditEmailPageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditEmailPageOpen}
                saveAction={saveEmail}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Seu e-mail'
                        value={tempEmail}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O seu e-mail é utilizado por nós para comunicações sobre o app e por você para fazer login, recuperar sua conta caso perca o acesso e outras funções importantes da plataforma.
                    </p>
                </div>
            </EditInfoPage>
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div onClick={toggleEditNamePageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Nome de usuário</p>
                                    <InputFieldPurple value={name} readOnly={true}/>
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditEmailPageOpen}>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-whiteT1 text-sm font-semibold">E-mail</p>
                                        <Confirmed initialConfirmation={true} />
                                    </div>
                                    <InputFieldPurple value={email} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
