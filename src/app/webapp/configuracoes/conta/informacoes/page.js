'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import Modal from '@/src/components/Modal';
import ButtonConfig from '@/src/components/ButtonConfig';

export const metadata = {
    title: 'Resenha.app • Informações pessoais',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function AccountInformation() {
    const [nickname, setNickname] = useState('João Davi S. N.');
    const [tempNickname, setTempNickname] = useState(nickname);

    const [birthday, setBirthday] = useState('26/11/2002')
    const [tempBirthday, setTempBirthday] = useState(birthday)

    const [phone, setPhone] = useState('(51) 9 9535-3595')
    const [tempPhone, setTempPhone] = useState(phone)

    const [address, setAddress] = useState('Rua Ramiro Barcelos, 1450')
    const [tempAddress, setTempAddress] = useState(address)

    const [cpf, setCpf] = useState('512.189.860-04')
    const [tempCpf, setTempCpf] = useState(cpf)

    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
    const [checkerCallback, setCheckerCallback] = useState(null);

    const [hasChange, setHasChange] = useState(false);

    const handleNicknameChange = (newValue) => {
        setHasChange(true);
        setTempNickname(newValue);
    };

    const handleBirthdayChange = (newValue) => {
        setHasChange(true);
        setTempBirthday(newValue);
    };

    const handlePhoneChanger = (newValue) => {
        setHasChange(true);
        setTempPhone(newValue);
    };

    const handleAddressChanger = (newValue) => {
        setHasChange(true);
        setTempAddress(newValue);
    };

    const handleCpfChanger = (newValue) => {
        setHasChange(true);
        setTempCpf(newValue);
    };

    const handleCancel = () => {
        setHasChange(false);
        setTempNickname(nickname);
        setTempBirthday(birthday);
        setTempPhone(phone);
        setTempAddress(address);
        setTempCpf(cpf);
    }

    const handleSave = () => {
        setHasChange(false);
        setNickname(tempNickname);
        setBirthday(tempBirthday);
        setPhone(tempPhone);
        setAddress(tempAddress);
        setCpf(tempCpf);
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader
                pageTitle="Informações pessoais"
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
                                <p className="text-whiteT1 text-sm font-semibold">Nome de usuário</p>
                                <InputFieldPurple value={tempNickname} onChange={handleNicknameChange} />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Data de nascimento</p>
                                <InputFieldPurple value={tempBirthday} onChange={handleBirthdayChange} />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Telefone</p>
                                <InputFieldPurple value={tempPhone} onChange={handlePhoneChanger} />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Endereço</p>
                                <InputFieldPurple value={tempAddress} onChange={handleAddressChanger} />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">CPF ou CNPJ</p>
                                <InputFieldPurple value={tempCpf} onChange={handleCpfChanger} />
                                <hr className="border-purpleT4" />
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
