'use client'

import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Vector from '@/src/components/Vector';

export default function Login() {
  const axios = require('axios');
  const qs = require('qs');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

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
      const response = await makeRequest('https://api.resenha.app/', {
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
          window.location.href = '/webapp/feed/';
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
      return response.data;
    } 
    
    catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  };

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
          </div>
        </div>
        <div className="flex-row flex gap-3 items-center mb-4 w-full">
          <Toggle labelText="Lembre-se de mim" showLabel={true} startToggled={true} onToggle={handleToggleChange}/>
          <Link href="/recuperacao" className="ml-auto flex-none text-sm font-bold">Esqueceu a senha?</Link>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <Button action={handleClick} label="Entrar" icon="arrow" />
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
