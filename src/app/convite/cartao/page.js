'use client';

import Button from '@/src/components/Button';
import CopyInput from '@/src/components/CopyInput';
import InputField from '@/src/components/InputField';
import Timer from '@/src/components/Timer';
import Back from '@/src/components/Back';
import { useState } from 'react';
import axios from 'axios';

export const metadata = {
    title: 'Resenha.app • Cartão',
    description: 'Venha fazer suas resenhas!',
}

export default function Credit() {
    const [owner, setOwner] = useState('');
    const [number, setNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');

    const axios = require('axios');
    const qs = require('qs');

    const handleNextClick = async () => {
        try {
            const code = Cookies.get('code');
            const name = Cookies.get('name');
            const email = Cookies.get('email');
            const minor = Cookies.get('minor');
            const method = Cookies.get('method').toLowerCase();

            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'tryToCreateGuest', method: method, code: code, name: name, birth: minor, email: email});
        } 
        
        catch (error) {
          console.error(error);
        }
    };

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        } catch (error) {
            throw new Error(`Request failed: ${error}`);
        }
    };

    const handleOwnerChange = (event) => {
        setOwner(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleExpirationChange = (event) => {
        setExpiration(event.target.value);
    };

    const handleCvvChange = (event) => {
        setCvv(event.target.value);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className='w-full flex items-start'>
                    <Back />
                </div>
                <div className="mb-4">
                    <svg width="53" height="42" viewBox="0 0 53 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M47.3 0.200019H5.69983C2.83982 0.200019 0.499817 2.54003 0.499817 5.40003V8.00004H52.5V5.40003C52.5 4.0209 51.9521 2.69826 50.9769 1.72307C50.0017 0.747876 48.6791 0.200019 47.3 0.200019Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M52.5 18.4001H0.499817V36.6001C0.499817 37.9793 1.04767 39.3019 2.02287 40.2771C2.99806 41.2523 4.3207 41.8001 5.69983 41.8001H47.3C48.6791 41.8001 50.0017 41.2523 50.9769 40.2771C51.9521 39.3019 52.5 37.9793 52.5 36.6001V18.4001ZM37.6615 32.1616C38.149 31.674 38.8104 31.4001 39.4999 31.4001H44.7C45.3895 31.4001 46.0508 31.674 46.5384 32.1616C47.026 32.6492 47.3 33.3106 47.3 34.0001C47.3 34.6897 47.026 35.351 46.5384 35.8386C46.0508 36.3262 45.3895 36.6001 44.7 36.6001H39.4999C38.8104 36.6001 38.149 36.3262 37.6615 35.8386C37.1739 35.351 36.8999 34.6897 36.8999 34.0001C36.8999 33.3106 37.1739 32.6492 37.6615 32.1616ZM22.0614 32.1616C22.549 31.674 23.2103 31.4001 23.8999 31.4001H29.0999C29.7895 31.4001 30.4508 31.674 30.9384 32.1616C31.426 32.6492 31.6999 33.3106 31.6999 34.0001C31.6999 34.6897 31.426 35.351 30.9384 35.8386C30.4508 36.3262 29.7895 36.6001 29.0999 36.6001H23.8999C23.2103 36.6001 22.549 36.3262 22.0614 35.8386C21.5738 35.351 21.2999 34.6897 21.2999 34.0001C21.2999 33.3106 21.5738 32.6492 22.0614 32.1616Z" fill="white" />
                    </svg>

                </div>
                <div className="flex flex-col mb-0 w-full">
                    <div>
                        <h2 className="text-2xl text-whiteT1 text-center font-bold">Pagamento com cartão</h2>
                        <p className="text-sm text-whiteT1 text-center font-thin mb-2">Insira os dados do seu cartão abaixo para efetuar o pagamento.</p>
                    </div>
                    <div className="flex flex-col mt-12 mb-2 gap-4 w-full">
                        <InputField placeholder="Nome impresso no cartão" showIcon={true} value={owner} action={handleOwnerChange} Icon="person" />
                        <InputField placeholder="Número do cartão" showIcon={true} value={number} action={handleNumberChange} Icon="card" />
                        <div className='flex flex-row gap-4'>
                            <InputField placeholder="Validade" value={expiration} action={handleExpirationChange} showIcon={true} Icon="calendar" />
                            <InputField placeholder="CVV" value={cvv} action={handleCvvChange} showIcon={true} Icon="cvv" />
                        </div>
                        <InputField placeholder="CPF do titular" value={cpf} action={handleCpfChange} showIcon={true} Icon="id" />
                    </div>
                </div>
                <div className='flex flex-col mt-2 align-center justify-center items-center'>
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.50001 0.5C7.72376 0.5 6.42663 0.798125 5.20601 1.13C3.95726 1.4675 2.69838 1.86687 1.95813 2.10875C1.64863 2.21096 1.37425 2.3984 1.16649 2.64954C0.95873 2.90068 0.826029 3.20533 0.783631 3.5285C0.113131 8.56513 1.66901 12.2979 3.55676 14.7673C4.35729 15.8236 5.31179 16.7538 6.38838 17.5269C6.82263 17.834 7.22538 18.0691 7.56738 18.23C7.88238 18.3785 8.22101 18.5 8.50001 18.5C8.77901 18.5 9.11651 18.3785 9.43263 18.23C9.84493 18.0296 10.2394 17.7944 10.6116 17.5269C11.6882 16.7538 12.6428 15.8236 13.4433 14.7673C15.331 12.2979 16.8869 8.56513 16.2164 3.5285C16.1741 3.20518 16.0414 2.90035 15.8336 2.64901C15.6259 2.39768 15.3515 2.21003 15.0419 2.10763C13.9673 1.75529 12.8843 1.42894 11.794 1.12888C10.5734 0.79925 9.27626 0.5 8.50001 0.5ZM10.9143 6.28925C11.0199 6.18363 11.1631 6.12429 11.3125 6.12429C11.4619 6.12429 11.6051 6.18363 11.7108 6.28925C11.8164 6.39487 11.8757 6.53813 11.8757 6.6875C11.8757 6.83687 11.8164 6.98013 11.7108 7.08575L8.33576 10.4608C8.2835 10.5131 8.22143 10.5547 8.15309 10.5831C8.08476 10.6114 8.01149 10.626 7.93751 10.626C7.86352 10.626 7.79026 10.6114 7.72192 10.5831C7.65358 10.5547 7.59151 10.5131 7.53926 10.4608L5.85176 8.77325C5.79946 8.72095 5.75797 8.65886 5.72967 8.59053C5.70136 8.5222 5.6868 8.44896 5.6868 8.375C5.6868 8.30104 5.70136 8.2278 5.72967 8.15947C5.75797 8.09114 5.79946 8.02905 5.85176 7.97675C5.90405 7.92445 5.96614 7.88296 6.03447 7.85466C6.10281 7.82636 6.17604 7.81179 6.25001 7.81179C6.32397 7.81179 6.39721 7.82636 6.46554 7.85466C6.53387 7.88296 6.59596 7.92445 6.64826 7.97675L7.72533 9.05477C7.84249 9.17203 8.03254 9.17205 8.14973 9.05482L10.9143 6.28925Z" fill="white" />
                    </svg>
                    <h1 className='text-[10px] text-center'>
                        Os seus dados de pagamento são protegidos <b>pela mesma criptografia de ponta usada nos bancos</b>.
                    </h1>
                </div>
                <div className="flex flex-col mt-4 mb-4 w-full">
                    <Button label="Pagar!" icon="arrow" action={handleNextClick} />
                </div>
                <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                    <h1 className="font-regular">
                        Saiba <a href="https://resenha.app"><b>como funciona</b></a>
                    </h1>
                </div>
            </section>
        </div>
    );
}
