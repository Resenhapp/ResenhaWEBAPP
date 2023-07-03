'use client'
import React, {useState} from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';

export const metadata = {
    title: 'Resenha.app • Detalhes da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const [username, setUsername] = useState('@dabilas');

    const handleUsernameChange = (newValue) => {
        setUsername(newValue);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Conta" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <InputFieldPurple
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
