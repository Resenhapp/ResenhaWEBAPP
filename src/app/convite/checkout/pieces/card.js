import InputField from '@/src/components/InputField';
import { useState } from 'react';
import React, { useEffect } from 'react';
import Vector from '@/src/components/Vector';

export default function Card({setIsFilled}) {
    const [owner, setOwner] = useState("");
    const [number, setNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");
    const [cpf, setCpf] = useState("");

    const handleOwnerChange = e => setOwner(e.target.value);
    const handleNumberChange = e => setNumber(e.target.value);
    const handleExpirationChange = e => setExpiration(e.target.value);
    const handleCvvChange = e => setCvv(e.target.value);
    const handleCpfChange = e => setCpf(e.target.value);

    return (
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col w-full">

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
                    <Vector vectorname={'shield03'} />
                    <h1 className='text-[10px] text-center'>
                        Os seus dados de pagamento são protegidos <b>pela mesma criptografia de ponta usada nos bancos</b>.
                    </h1>
                </div>
                <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                   
                </div>
            </section>
        </div>
    )
}