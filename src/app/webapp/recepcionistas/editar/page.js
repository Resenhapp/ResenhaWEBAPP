'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import Dropdown from '@/src/components/Dropdown';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';

export default function EditConcierge() {

    const [selectedOption, setSelectedOption] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const [isModalOpen, setModalOpen] = useState(false);

    const conciergeCurrentName = 'Claudinho bochecha';
    const [conciergeNewName, setConciergeNewName] = useState(conciergeCurrentName); // initialize new name as current name

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/${pageToGo}`;
        }
    };

    const handleButtonBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back()
        }
    }

    const handleInputChange = (e) => {
        setConciergeNewName(e.target.value); // update new name as the user types
    };

    const isFilled = conciergeNewName !== '';  // Check if the field is filled or not



    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Editar recepcionista'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex flex-col justify-around content-center align-center gap-4 h-full items-center w-full max-w-md p-4">
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Editando recepcionista...</h1>
                            <p className=''>Recepcionistas são as pessoas que vão cuidar da entrada dos seus convidados na sua resenha. Para saber mais <a href='https://resenha.app/aprenda/recepcionistas'><b>toque aqui</b>.</a></p>
                        </div>
                        <div className='flex flex-col w-full gap-4'>
                            <InputField
                                Icon={'user'}
                                showIcon={true}
                                placeholder={'Nome do recepcionista'}
                                action={handleInputChange}
                                value={conciergeNewName}  // change this line
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
                    <div className='mt-10 w-full flex flex-row justify-between'>
                        <button className='px-5 py-4' onClick={handleButtonBack}>Cancelar</button>
                        <Button
                            label={'Salvar'}
                            active={isFilled}
                            icon={'check'}
                            action={() => handleNavigation('recepcionistas')}
                            iconSide='right'
                            height={1}
                            width={3}
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
