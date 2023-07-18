'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import Dropdown from '@/src/components/Dropdown';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';

export const metadata = {
    title: 'Resenha.app • Novo recepcionista',
    description: 'Venha fazer suas resenhas!',
}

export default function NewConcierge() {

    const [selectedOption, setSelectedOption] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    const handleInputChange = (e) => {
        setIsFilled(e.target.value !== '');
    };


    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Novo recepcionista'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-col justify-around content-center align-center gap-4 h-full items-center w-full max-w-md p-4">
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Adicione um novo recepcionista!</h1>
                            <p className=''>Recepcionistas são as pessoas que vão cuidar da entrada dos seus convidados na sua resenha. Para saber mais <a href='https://resenha.app/aprenda/recepcionistas'><b>toque aqui</b>.</a></p>
                        </div>
                        <div className='flex flex-col w-full gap-4'>
                            <InputField
                                Icon={'user'}
                                showIcon={true}
                                placeholder={'Nome do recepcionista'}
                                action={handleInputChange} // Update state on input change
                            />
                            <div className='flex flex-col gap-1'>
                                <button onClick={handleModalOpen} className='ml-2 flex flex-row items-center content-center'>
                                    <span>Resenha atribuida</span>
                                    <Vector vectorname={'question01'} />
                                </button>
                                <Dropdown
                                    options={options}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 w-full'>
                        <Button
                            label={'Criar recepcionista'}
                            active={isFilled}
                            icon={'plus'}
                            action={() => handleNavigation('recepcionistas')}
                            iconSide='right'
                            height={1}
                            width={1}
                            textAlign='center'
                        />
                    </div>
                </section>
            </div>
            <Modal show={isModalOpen} close={handleModalClose}>
                <h1 className='text-2xl font-bold'>Resenha atribuída:</h1>
                <p className='mb-4'>Um recepcionista atribuído é o responsável por administrar a entrada dos convidados no dia do evento. Isso significa que, durante a resenha, esse indivíduo cuidará do acesso e garantirá uma recepção suave para todos os participantes.</p>
                <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full w-full ring-inset py-2 px-4' onClick={handleModalClose}>Ok, entendi!</button>
            </Modal>
        </div>
    )
}
