'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import Modal from '@/src/components/Modal';

export const metadata = {
    title: 'Resenha.app • Detalhes da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const [username, setUsername] = useState('@dabilas');
    const [tempUsername, setTempUsername] = useState(username);
    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
    const [checkerCallback, setCheckerCallback] = useState(null);

    const [hasChange, setHasChange] = useState(false);

    const handleUsernameChange2 = (newValue) => {
        setHasChange(true);
        setTempUsername(newValue);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader
                pageTitle="Conta"
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
                                <InputFieldPurple value={tempUsername} onChange={handleUsernameChange2} />
                            </div>
                        </div>
                    </div>
                </section>
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
