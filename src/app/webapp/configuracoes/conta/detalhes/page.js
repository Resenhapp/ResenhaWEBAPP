'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import ButtonConfig from '@/src/components/ButtonConfig';
import Modal from '@/src/components/Modal';

export const metadata = {
    title: 'Resenha.app • Detalhes da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const [username, setUsername] = useState('@dabilas');
    const [email, setEmail] = useState('joao*****n@gmail.com');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isEditing, setEditing] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    const handleEdit = () => {
        setNewUsername(username);
        setNewEmail(email);
        setEditing(true);
    };

    const handleSave = () => {
        setUsername(newUsername);
        setEmail(newEmail);
        setEditing(false);
    };

    const handleCancel = () => {
        setNewUsername('');
        setNewEmail('');
        setEditing(false);
    };

    const handleGoBack = () => {
        if (isEditing) {
            setShowExitConfirmation(true);
        }
    };

    const handleConfirmExit = () => {
        setShowExitConfirmation(false);
    };

    const handleCancelExit = () => {
        setShowExitConfirmation(false);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => setShowExitConfirmation(true)} pageTitle="Detalhes da conta" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <p className="text-whiteT1 text-sm font-semibold">Nome de usuário</p>
                                {isEditing ? (
                                    <InputFieldPurple
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                ) : (
                                    <InputFieldPurple value={username} readOnly />
                                )}
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">E-mail</p>
                                {isEditing ? (
                                    <InputFieldPurple
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                ) : (
                                    <InputFieldPurple value={email} readOnly />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="flex justify-end px-4 py-2">
                {isEditing ? (
                    <>
                        <ButtonConfig label="Cancelar" action={handleCancel} />
                        <ButtonConfig label="Salvar" action={handleSave} />
                    </>
                ) : (
                    <ButtonConfig label="Editar" action={handleEdit} />
                )}
            </div>
            <Modal show={showExitConfirmation} close={handleCancelExit}>
                <h2>Deseja sair sem salvar as alterações?</h2>
                <div>
                    <button onClick={handleConfirmExit}>Sim</button>
                    <button onClick={handleCancelExit}>Não</button>
                </div>
            </Modal>
        </div>
    );
}
