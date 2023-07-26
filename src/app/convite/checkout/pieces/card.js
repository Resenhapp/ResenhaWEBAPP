import InputField from '@/src/components/InputField';
import { useState } from 'react';
import React, { useEffect } from 'react';
import Vector from '@/src/components/Vector';

export default function Card({setIsFilled, setCardHolder, setCardNumber, setCardExpiration, setCardCVV, setCardCPF}) {
    const [owner, setOwner] = useState("");
    const [number, setNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");
    const [cpf, setCpf] = useState("");

    const handleOwnerChange = e => {
        setOwner(e.target.value);
        setCardHolder(e.target.value);
      }
  
      const handleNumberChange = e => {
        setNumber(e.target.value);
        setCardNumber(e.target.value);
      }
  
      const handleExpirationChange = e => {
        setExpiration(e.target.value);
        setCardExpiration(e.target.value);
      }
  
      const handleCvvChange = e => {
        setCvv(e.target.value);
        setCardCVV(e.target.value);
      }
  
      const handleCpfChange = e => {
        setCpf(e.target.value);
        setCardCPF(e.target.value);
      }
        

    useEffect(() => {
        if (owner && number && expiration && cvv && cpf) {
                setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [owner, number, expiration, cvv, cpf]);
    
    return (
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col w-full">

                    <div className="flex flex-col mt-12 mb-2 gap-4 w-full">
                        <InputField placeholder="Nome impresso no cartão" showIcon={true} value={owner} action={handleOwnerChange} Icon="person" />
                        <InputField placeholder="Número do cartão" showIcon={true} value={number} action={handleNumberChange} Icon="card" type='card'/>
                        <div className='flex flex-row gap-4'>
                            <InputField placeholder="Validade" value={expiration} action={handleExpirationChange} showIcon={true} Icon="calendar" type='date'/>
                            <InputField placeholder="CVV" value={cvv} action={handleCvvChange} showIcon={true} Icon="cvv" />
                        </div>
                        <InputField placeholder="CPF do titular" value={cpf} action={handleCpfChange} showIcon={true} Icon="id" type='cpf'/>
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