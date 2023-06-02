'use client'
import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';
import Dropdown from '@/src/components/Dropdown';
import Back from '@/src/components/Back';
import AmountSelector from '@/src/components/AmountSelector';
import Checker from '@/src/components/Checker';
import { useState } from 'react';
export const metadata = {
    title: 'Resenha.app • Dados',
    description: 'Venha fazer suas resenhas!',
}

export default function Info() {
    const options = ['Pix', 'Cartão', 'Dinheiro'];
    const [amount, setAmount] = useState(1);
    const pricePerItem = 20;
    const date = '10/10/2021';

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    const price = pricePerItem * amount;

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className='w-full flex items-start'>
                    <Back />
                </div>
                <div className="flex flex-col mb-0 w-full">
                    <div>
                        <h2 className="text-2xl text-whiteT1 text-center font-bold">Informações</h2>
                        <p className="text-sm text-whiteT1 text-center font-thin mb-4">Antes de continuar, precisamos de algumas informações...</p>
                    </div>
                    <div className='bg-purpleT2 items-center justify-center align-center flex flex-col ring-2 p-2 ring-inset ring-purpleT3 rounded-2xl'>
                        <h2 className="text-xl text-whiteT1 text-left font-bold">Você está comprando:</h2>
                        <div className='flex flex-row'>
                            <div>
                                <p className="text-2md text-whiteT1 text-left font-normal">Resenha dos manos</p>
                            </div>
                            <div className='flex-row flex gap-2 bg-purpleT1 h-fit rounded-2xl py-1 px-3 ml-4 ring-inset ring-2 ring-purpleT3'>
                                <p className="text-sm text-whiteT1 text-left font-normal">{amount}x</p>
                                <p className="text-sm text-whiteT1 text-left font-bold">R$ {price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 mb-12 gap-4 w-full">
                        <InputField placeholder="Nome" showIcon={true} Icon="person" />
                        <InputField placeholder="E-mail" showIcon={true} Icon="mail" />
                        <div className="flex bg-whiteT1 ring-2 px-4 ring-whiteT2 ring-inset rounded-2xl h-14 flex-row items-center justify-between">
                            <h2 className="text-purpleT2 text-2md font-normal">Entradas</h2>
                            <AmountSelector onChange={handleAmountChange} className="text-purpleT1" />
                        </div>
                        <Checker labelText={`Tenho mais de 18 anos.`} showLabel={true} startChecked={false} />

                        <Dropdown showIcon={true} Icon="coin" options={options} placeholder='Forma de pagamento' />
                    </div>
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <Button label="Próximo" icon="arrow" />
                </div>
                <div className="flex items-center justify-end">
                    <p className="mr-1">Tem uma conta?</p>
                    <Link href="/cadastro" className="font-bold">Entre aqui!</Link>
                </div>
            </section>
        </div>
    );
}
