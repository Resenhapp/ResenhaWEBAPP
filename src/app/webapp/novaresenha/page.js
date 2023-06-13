'use client'
import Button from '@/src/components/Button';
import Back from '@/src/components/Back';
import ImageInput from '@/src/components/ImageInput';
import React, { useState } from 'react';
import Toggle from '@/src/components/Toggle';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}
export default function NewEvent() {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputstyle = 'w-full p-2 bg-whiteT1 ring-2 ring-grayT0 ring- rounded-xl h-12 mt-2';
    const handleImageChange = (image) => {
        setSelectedImage(image);
    };
    const handleQuestionAction = () => {
        console.log('a');
    };
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <Back />
                <h1 className='text-2xl font-bold'>Nova resenha</h1>
            </div>
            <div className='mt-4 flex justify-center'>
                <ImageInput image={selectedImage} onChange={handleImageChange} />
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-5/6 text-blackT1'>
                    <input placeholder='Nome da resenha' className={inputstyle} />
                    <div className='flex gap-2'>
                        <input placeholder='Data' className={inputstyle} />
                        <input placeholder='Horário' className={inputstyle} />
                        <input placeholder='Valor' className={inputstyle} />
                    </div>
                    <input placeholder='Endereço' className={inputstyle} />
                    <textarea className='w-full p-2 bg-whiteT1 ring-2 ring-grayT0 rounded-2xl h-24 mt-2'></textarea>
                    <div className='h-fit flex flex-col gap-2'>
                        <Toggle labelText="Aceitar pagamento na hora" showLabel={true} startToggled={true} showQuestion={true} questionAction={handleQuestionAction} textColor="white" />
                        <Toggle labelText="Resenha privada" showLabel={true} startToggled={true} showQuestion={true} questionAction={handleQuestionAction} textColor="white" />
                        <Toggle labelText="Exigir senha" showLabel={true} startToggled={false} showQuestion={true} questionAction={handleQuestionAction} textColor="white" />
                        <Toggle labelText="Para maiores" showLabel={true} startToggled={false} showQuestion={true} questionAction={handleQuestionAction} textColor="white" />
                    </div>
                    <div className='mt-4'>
                        <Button label={'Nova Resenha'} icon={'plus'} action={() => { }} iconSide='right' height={1} width={1} textAlign='center' />
                    </div>
                    <div className='mt-4 mb-4'>
                        <p className='text-purpleT5 text-center text-[12px]'>
                            * cobramos uma taxa de 10% (com um mínimo de R$ 1,00) sobre o valor de cada entrada.{' '}
                            <a className='font-bold' href='https://google.com' target='_blank' rel='noopener noreferrer'>
                                Saiba mais.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}