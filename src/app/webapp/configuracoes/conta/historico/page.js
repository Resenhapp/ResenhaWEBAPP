'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import ProfileEvent from '@/src/components/ProfileEvent';
import Modal from '@/src/components/Modal';
import ButtonConfig from '@/src/components/ButtonConfig';
import NotificationBase from '@/src/components/NotificationBase';

export const metadata = {
    title: 'Resenha.app • Histórico de atividades',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const [username, setUsername] = useState('@dabilas');
    const [tempUsername, setTempUsername] = useState(username);

    const [email, setEmail] = useState('joao*****n@gmail.com')
    const [tempEmail, setTempEmail] = useState(email)

    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
    const [checkerCallback, setCheckerCallback] = useState(null);

    const [hasChange, setHasChange] = useState(false);

    const handleUsernameChange = (newValue) => {
        setHasChange(true);
        setTempUsername(newValue);
    };

    const handleEmailChange = (newValue) => {
        setHasChange(true);
        setTempEmail(newValue);
    };

    const handleCancel = () => {
        setHasChange(false);
        setTempUsername(username);
        setTempEmail(email);
    }

    const handleSave = () => {
        setHasChange(false);
        setUsername(tempUsername);
        setEmail(tempEmail);
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader
                pageTitle="Histórico de atividades"
                isBack={true}
                checker={() => new Promise((resolve, reject) => {
                    if (hasChange) {
                        setUnsavedChangesModalOpen(true);
                        setCheckerCallback(() => resolve);
                    } else {
                        resolve(true);
                    }
                })}
            />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <NotificationBase 
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png'}
                                    title={'Resenha criada!'}
                                    description={'A resenha Resenha no Terraço foi criada com sucesso.'}
                                    date={'Hoje'}
                                    hour={'17:00'}
                                />
                                <NotificationBase 
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/dEUsxUJp.png'}
                                    title={'Presença confirmada!'}
                                    description={'Sua presença no MATUÊ - Porto Alegre  foi confirmada! Seu código é 6478.'}
                                    date={'09 de junho'}
                                    hour={'14:28'}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className='flex flex-row justify-center p-8'>
                {hasChange && (
                    <div className="flex p-8 space-x-4">
                        <ButtonConfig label="Cancelar" action={handleCancel} />
                        <ButtonConfig label="Salvar" action={handleSave} />
                    </div>
                )}
            </div>
            <Modal show={isUnsavedChangesModalOpen} close={setUnsavedChangesModalOpen}>
                <div className="gap-2 flex flex-col">
                    <h1 className="text-center">Ei! Você tem alterações que não foram salvas! Vai sair sem salvar?</h1>
                    <button className="bg-purpleT2 ring-1 ring-purpleT3 rounded-full ring-inset py-2 px-4" onClick={() => {
                        if (typeof checkerCallback === 'function') {
                            checkerCallback(false);
                        }
                        setUnsavedChangesModalOpen(false);
                    }}>Sim, eu vou.</button>
                    <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full ring-inset py-2 px-4' onClick={() => {
                        setUnsavedChangesModalOpen(false);
                    }}>Não, peraí!</button>
                </div>
            </Modal>
        </div>
    );
}
