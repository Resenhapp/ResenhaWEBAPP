'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import EditInfoPage from '@/src/components/EditInfoPage';

export const metadata = {
    title: 'Resenha.app • Detalhes da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function AccountDetails() {
    const initialName = '@dabilas';
    const initialEmail = 'joao*****n@gmail.com';

    const [isEditNamePageOpen, setIsEditNamePageOpen] = useState(false);
    const [isEditEmailPageOpen, setIsEditEmailPageOpen] = useState(false);

    const toggleEditNamePageOpen = () => {
        setIsEditNamePageOpen(!isEditNamePageOpen);
        setTempName(name); // Armazena o valor atual do nome de usuário
    };
    const toggleEditEmailPageOpen = () => {
        setIsEditEmailPageOpen(!isEditEmailPageOpen);
        setTempEmail(email); // Armazena o valor atual do nome de usuário
    };

    const [name, setName] = useState(initialName);
    const [tempName, setTempName] = useState(initialName); // Novo estado para armazenar temporariamente o nome de usuário

    const [email, setEmail] = useState(initialEmail);
    const [tempEmail, setTempEmail] = useState(initialEmail);

    const handleNameChange = (event) => {
        setTempName(event.target.value); // Atualiza o valor temporário do nome de usuário
    };
    const handleEmailChange = (event) => {
        setTempEmail(event.target.value);
    }

    const saveName = () => {
        setName(tempName); // Salva o valor temporário como o novo nome de usuário
        toggleEditNamePageOpen();
    };
    const saveEmail = () => {
        setEmail(tempEmail); // Salva o valor temporário como o novo nome de usuário
        toggleEditEmailPageOpen();
    };

    const cancelEditName = () => {
        setTempName(name); // Restaura o valor original do nome de usuário
        toggleEditNamePageOpen();
    };
    const cancelEditEmail = () => {
        setTempEmail(email); // Restaura o valor original do nome de usuário
        toggleEditEmailPageOpen();
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Detalhes da conta" />
            <EditInfoPage
                isOpen={isEditNamePageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditNamePageOpen}
                saveAction={saveName}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome de usuário'
                        value={tempName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O nome da resenha é o que as pessoas verão quando entrarem no seu convite, então ele deve ser objetivo e simples, algo que traduza o que vai ser sua resenha.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditEmailPageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditEmailPageOpen}
                saveAction={saveEmail}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Seu e-mail'
                        value={tempEmail}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O nome da resenha é o que as pessoas verão quando entrarem no seu convite, então ele deve ser objetivo e simples, algo que traduza o que vai ser sua resenha.
                    </p>
                </div>
            </EditInfoPage>
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div onClick={toggleEditNamePageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Nome de usuário</p>
                                    <InputFieldPurple value={name} readOnly={true}/>
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditEmailPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">E-mail</p>
                                    <InputFieldPurple value={email} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
