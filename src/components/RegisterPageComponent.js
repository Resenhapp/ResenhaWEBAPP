import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Vector from './Vector';

const RegisterPageComponent = ({ }) => {
  const axios = require('axios');
  const qs = require('qs');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [showPasswordInstructions, setShowPasswordInstructions] = useState(false);
 
  const makeRequest = async (url, data) => {
    const response = await axios.post(url, qs.stringify(data));
    return response.data;
  };

  const handleNextClick = async () => {
    // if (!name) {
    //   alert('Por favor, insira o seu nome.');
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   alert('Por favor, insira um email válido.');
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   alert('.');
    //   return;
    // }

    const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
      request: 'tryToCreateUser',
      name: name,
      email: email,
      password: password
    });

    if (response.token && typeof window !== 'undefined') {
      const expirationDate = new Date();

      expirationDate.setDate(expirationDate.getDate() + 30);
      Cookies.set('token', response.token, { expires: expirationDate });

      window.location.href = '/feed';
    }
  };
  
  const [error, setError] = useState('');


  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <section className="flex flex-col items-center w-full max-w-md p-4 bg-transparent rounded-xl">
        <div className="mb-16">
          <Vector vectorname={'logo'} />
        </div>
        <div className="flex flex-col mb-0 w-full">
          <h2 className="text-2xl text-whiteT1 font-bold mb-2">Criar conta</h2>
          <div className="flex flex-col mb-8 gap-4 w-full">
            <InputField placeholder="Seu nome" showIcon={true} Icon="person" value={name} action={(e) => setName(e.target.value)} />
            <InputField placeholder="Email" showIcon={true} Icon="mail" value={email} action={(e) => setEmail(e.target.value)} />
            <PasswordField placeholder="Senha" showIcon={true} value={password} action={(e) => setPassword(e.target.value)} />
            {showPasswordInstructions && <div>
              <div className='flex flex-row gap-2'>
                {/* <Vector vectorname={isValid ? 'check06' : 'xMark04'} /> */}
                <p>{error}</p>
              </div>
            </div>}
          </div>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <Button action={handleNextClick} label="Criar conta!" icon="arrow" iconSide='right' active={isValid} />
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
