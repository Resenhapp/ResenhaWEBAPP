'use client'

import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Vector from '@/src/components/Vector';
import Loading from "@/src/components/Loading";

import React, { useState, useEffect } from 'react';

export default function Login() {
  var token = Cookies.get('token');

  const axios = require('axios');
  const qs = require('qs');

  const [loading, setLoading] = useState(false);

  const handleNavigation = (pageToGo) => {
    if (typeof window !== 'undefined') {
        window.location.href = `/${pageToGo}`;
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getUserData',
          token: token,
          requested: "mine"
      });

      try {
        if (response.mine == true) {
          handleNavigation("feed");
        }
    
        else {
          Cookies.remove("token");
  
          window.location.href = `/login`;
        }
      } 

      catch (error) {
        Cookies.remove("token");

        window.location.href = `/login`;
      }
    } 
    
    catch (error) {
      setLoading(false);
    }
  };

  const [errorIndex, setErrorIndex] = useState(null);
  const errors = [
    "Ocorreu um erro desconhecido.", // 0
    "Nome de usuário muito curto.", // 1
    "Nome de usuário inválido.", // 2
    "Credenciais inválidas.", // 3
    "Nome de usuário não pode ser vazio.", // 4
  ];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleToggleChange = () => {
    setRemember(!remember);
  };

  const handleClick = async () => {
    try {
      const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
        request: 'tryToAuthenticate', 
        email: email, 
        password: password 
      });

      if (response.token) {
        const expirationDate = new Date();

        if (remember) {
          expirationDate.setDate(expirationDate.getDate() + 30);
        } 
        
        else {
          expirationDate.setDate(expirationDate.getDate() + 3);
        }

        Cookies.set('token', response.token, { expires: expirationDate });

        if (typeof window !== 'undefined') {
          window.location.href = '/feed/';
        }
      }
    }
    
    catch (error) {
      console.error(error);
    }
  };

  const makeRequest = async (url, data) => {
    try {
      const response = await axios.post(url, qs.stringify(data));

      if (response.data && response.data.error) {
        switch (response.data.error) {
          case "invalid_credentials":
            setErrorIndex(3);
            break;
          case "empty_username":
            setErrorIndex(4);
            break;
          case "short_username":
            setErrorIndex(1);
            break;
          case "invalid_username":
            setErrorIndex(2);
            break;
          default:
            setErrorIndex(0);  // Set to 0 for an unknown error
            break;
        }
        setIsLoginErrorVisible(true); // Set the error to visible when an error occurs
      }

      else {return response.data;}
    } 
    
    catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, []);

  if (loading) {
    return (
        <div className="h-screen w-full flex justify-center content-center items-center">
            <Loading/>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <section className="flex flex-col items-center w-full max-w-md p-4">
        <div className="mb-16">
          <Vector vectorname={"logo"}/>
        </div>
        <div className="flex flex-col mb-0 w-full">
          <h2 className="text-2xl text-whiteT1 font-bold mb-2">Login</h2>
          <div className="flex flex-col mb-4 gap-4 w-full">
            <InputField placeholder="Email" showIcon={true} Icon="mail" value={email} action={handleEmailChange} />
            <PasswordField placeholder="Senha" showIcon={true} value={password} action={handlePasswordChange} />
            {errorIndex && <p className='text-redT4'>{errors[errorIndex]}</p>}
          </div>
        </div>
        <div className="flex-row flex gap-3 items-center mb-4 w-full">
          <Toggle labelText="Lembre-se de mim" showLabel={true} startToggled={true} onToggle={handleToggleChange}/>
          <Link href="/recuperacao" className="ml-auto flex-none text-sm font-bold">Esqueceu a senha?</Link>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <Button action={handleClick} label="Entrar" icon="arrow" iconSide='right'/>
        </div>

        {/* <div className="flex flex-col mb-2 mt-10 w-full">
          <h1 className="text-center text-sm font-regular mb-0">Ou</h1>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <GoogleButton context="Entrar com Google" />
        </div> */}

        <div className="flex items-center justify-end">
          <p className="mr-1">Ainda não tem uma conta?</p>
          <Link href="/cadastro" className="font-bold">Crie uma!</Link>
        </div>
      </section>
    </div>
  );
  }
