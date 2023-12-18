import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Vector from './Vector';

const RegisterPageComponent = ({}) => {
  const axios = require('axios');
  const qs = require('qs');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(validateEmail(event.target.value) && validatePassword(password) && name);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsValid(validateEmail(email) && validatePassword(password) && event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValid(validateEmail(email) && validatePassword(event.target.value) && name);
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
    return re.test(password);
  }

  const makeRequest = async (url, data) => {
      const response = await axios.post(url, qs.stringify(data));
      return response.data;
  };

  const handleNextClick = async () => {
    if (!name) {
      alert('Por favor, insira o seu nome.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (!validatePassword(password)) {
      alert('A senha precisa ter pelo menos 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caractere especial e no mínimo oito caracteres.');
      return;
    }

    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, { 
      request: 'tryToCreateUser', 
      name: name,
      email: email, 
      password: password
    });

    window.location.href = 'https://www.resenha.app/cadastro/confirmacao';

    if (response.token && typeof window !== 'undefined') {
      expirationDate.setDate(expirationDate.getDate() + 30);
      Cookies.set('token', response.token, { expires: expirationDate });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <section className="flex flex-col items-center w-full max-w-md p-4">
        <div className="mb-16">
          <Vector vectorname={'logo'} />
        </div>
        <div className="flex flex-col mb-0 w-full">
          <h2 className="text-2xl text-whiteT1 font-bold mb-2">Criar conta</h2>
        <div className="flex flex-col mb-8 gap-4 w-full">
          <InputField placeholder="Seu nome" showIcon={true} Icon="person" value={name} action={handleNameChange}/>
          <InputField placeholder="Email" showIcon={true} Icon="mail" value={email} action={handleEmailChange}/>
          <PasswordField placeholder="Senha" showIcon={true} value={password} action={handlePasswordChange}/>
          <p className='text-sm'>A sua senha precisa ter 8 caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo (tipo # @ ! e tals)</p>
        </div>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <Button action={handleNextClick} label="Criar conta!" icon="arrow" iconSide='right' active={isValid}/>
        </div>
        <div className="flex flex-col mb-2 mt-10 w-full">
        </div>

        <div className="flex items-center justify-end">
          <p className="mr-1">Já tem uma conta?</p>
          <Link href="/login" className="font-bold">Entre aqui!</Link>
        </div>
      </section>
    </div>
  );
}

export default RegisterPageComponent;
