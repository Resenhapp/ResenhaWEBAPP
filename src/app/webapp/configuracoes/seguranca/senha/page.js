'use client'
import React, {useState} from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import ConfigDropDown from '@/src/components/ConfigDropDown';
import EditInfoPage from '@/src/components/EditInfoPage';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

export const metadata = {
    title: 'Resenha.app • Configurações de senha',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function PasswordConfig() {
    const username = Cookies.get('username');
    const validator = Cookies.get('validator');
    
    if (!username || !validator) {
      window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    const options = ['Desabilitado']
    var initialPassword = '•••••••'
    
    const [method, setMethod] = useState('');
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
    
        try {
            const response = await sendEditRequest(data);
      
            if (response.username && response.validator) {
                Cookies.set('username', response.username);
                Cookies.set('validator', response.validator);
            }
    
            if (!response.error) {
                toggleEditPasswordPageOpen();
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    };

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

    const sendEditRequest = async (data) => {
        try {
          const response = await makeRequest('http://localhost/resenha.app/api/', {
            request: 'editUserData',
            username: username,
            validator: validator,
            data: data
          });
      
          return response;
        } 
        
        catch (error) {
          console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Config. de senha" />
            <EditInfoPage
                isOpen={isEditPasswordPageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditPasswordPageOpen}
                saveAction={savePassword}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome de usuário'
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
