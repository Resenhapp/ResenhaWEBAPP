'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import EditInfoPage from '@/src/components/EditInfoPage';

export const metadata = {
    title: 'Resenha.app • Informações pessoais',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function AccountInfo() {
    const initialName = 'João Davi S. N.';
    const initialBirthday = 'joao*****n@gmail.com';
    const initialPhone = '(51) 9 9535-3595';
    const initialAddress = 'Rua Ramiro Barcelos, 1450';
    const initialCpf = '513.169.860-04';

    const [isEditNamePageOpen, setIsEditNamePageOpen] = useState(false);
    const [isEditBirthdayPageOpen, setIsEditBirthdayPageOpen] = useState(false);
    const [isEditPhonePageOpen, setIsEditPhonePageOpen] = useState(false);
    const [isEditAddressPageOpen, setIsEditAddressPageOpen] = useState(false);
    const [isEditCpfPageOpen, setIsEditCpfPageOpen] = useState(false);

    const toggleEditNamePageOpen = () => {
        setIsEditNamePageOpen(!isEditNamePageOpen);
        setTempName(name);
    };

    const toggleEditBirthdayPageOpen = () => {
        setIsEditBirthdayPageOpen(!isEditBirthdayPageOpen);
        setTempBirthday(birthday);
    };

    const toggleEditPhonePageOpen = () => {
        setIsEditPhonePageOpen(!isEditPhonePageOpen);
        setTempPhone(phone);
    };

    const toggleEditAddressPageOpen = () => {
        setIsEditAddressPageOpen(!isEditAddressPageOpen);
        setTempAddress(address);
    };

    const toggleEditCpfPageOpen = () => {
        setIsEditCpfPageOpen(!isEditCpfPageOpen);
        setTempCpf(cpf);
    };

    const [name, setName] = useState(initialName);
    const [tempName, setTempName] = useState(initialName);

    const [birthday, setBirthday] = useState(initialBirthday);
    const [tempBirthday, setTempBirthday] = useState(initialBirthday);

    const [phone, setPhone] = useState(initialPhone);
    const [tempPhone, setTempPhone] = useState(initialPhone);

    const [address, setAddress] = useState(initialAddress);
    const [tempAddress, setTempAddress] = useState(initialAddress);

    const [cpf, setCpf] = useState(initialCpf);
    const [tempCpf, setTempCpf] = useState(initialCpf);

    const handleNameChange = (event) => {
        setTempName(event.target.value);
    };

    const handleBirthdayChange = (event) => {
        setTempBirthday(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setTempPhone(event.target.value);
    };

    const handleAddressChange = (event) => {
        setTempAddress(event.target.value);
    };

    const handleCpfChange = (event) => {
        setTempCpf(event.target.value);
    };

    const saveName = () => {
        setName(tempName);
        toggleEditNamePageOpen();
    };

    const saveBirthday = () => {
        setBirthday(tempBirthday);
        toggleEditBirthdayPageOpen();
    };

    const savePhone = () => {
        setPhone(tempPhone);
        toggleEditPhonePageOpen();
    };

    const saveAddress = () => {
        setAddress(tempAddress);
        toggleEditAddressPageOpen();
    };

    const saveCpf = () => {
        setCpf(tempCpf);
        toggleEditCpfPageOpen();
    };

    const cancelEditName = () => {
        setTempName(name);
        toggleEditNamePageOpen();
    };

    const cancelEditBirthday = () => {
        setTempBirthday(birthday);
        toggleEditBirthdayPageOpen();
    };

    const cancelEditPhone = () => {
        setTempPhone(phone);
        toggleEditPhonePageOpen();
    };

    const cancelEditAddress = () => {
        setTempAddress(address);
        toggleEditAddressPageOpen();
    };

    const cancelEditCpf = () => {
        setTempCpf(cpf);
        toggleEditCpfPageOpen();
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Informações pessoais" />
            <EditInfoPage
                isOpen={isEditNamePageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditNamePageOpen}
                saveAction={saveName}
                cancelAction={cancelEditName}
            >
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
                        O nome de usuário é o que as pessoas verão quando entrarem no seu perfil.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditBirthdayPageOpen}
                pageTitle={'Data de nascimento'}
                togglePage={toggleEditBirthdayPageOpen}
                saveAction={saveBirthday}
                cancelAction={cancelEditBirthday}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Data de nascimento'
                        value={tempBirthday}
                        onChange={handleBirthdayChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira sua data de nascimento.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditPhonePageOpen}
                pageTitle={'Telefone'}
                togglePage={toggleEditPhonePageOpen}
                saveAction={savePhone}
                cancelAction={cancelEditPhone}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Telefone'
                        value={tempPhone}
                        onChange={handlePhoneChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu número de telefone.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditAddressPageOpen}
                pageTitle={'Endereço'}
                togglePage={toggleEditAddressPageOpen}
                saveAction={saveAddress}
                cancelAction={cancelEditAddress}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Endereço'
                        value={tempAddress}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu endereço.
                    </p>
                </div>
            </EditInfoPage>
            <EditInfoPage
                isOpen={isEditCpfPageOpen}
                pageTitle={'CPF'}
                togglePage={toggleEditCpfPageOpen}
                saveAction={saveCpf}
                cancelAction={cancelEditCpf}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='CPF'
                        value={tempCpf}
                        onChange={handleCpfChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        Insira seu CPF.
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
                                    <InputFieldPurple value={name} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditBirthdayPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Data de Nascimento</p>
                                    <InputFieldPurple value={birthday} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditPhonePageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Telefone</p>
                                    <InputFieldPurple value={phone} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditAddressPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Endereço</p>
                                    <InputFieldPurple value={address} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div onClick={toggleEditCpfPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">CPF</p>
                                    <InputFieldPurple value={cpf} readOnly={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
