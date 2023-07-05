'use client'
import React, {useState} from 'react';
import PageHeader from '@/src/components/PageHeader';
import InputFieldPurple from '@/src/components/InputFieldPurple';
import ConfigDropDown from '@/src/components/ConfigDropDown';
import EditInfoPage from '@/src/components/EditInfoPage';

export const metadata = {
    title: 'Resenha.app • Configurações de senha',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function PasswordConfig() {

    const options = ['Desabilitado', 'Telefone', 'E-mail']
    var initialPassword = '•••••••'
    
    const [method, setMethod] = useState('');
    const [isEditPasswordPageOpen, setIsEditPasswordPageOpen] = useState(false);
    const [password, setPassword] = useState(initialPassword);
    const [tempPassword, setTempPassword] = useState(initialPassword);

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setTempPassword(event.target.value); // Atualiza o valor temporário da senha
    };
    const toggleEditPasswordPageOpen = () => {
        setIsEditPasswordPageOpen(!isEditPasswordPageOpen);
        setTempPassword(password); // Armazena o valor atual da senha
    };

    const savePassword = () => {
        setPassword(tempPassword); // Salva o valor temporário como o novo nome de usuário
        toggleEditPasswordPageOpen();
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Config. de senha" />
            <EditInfoPage
                isOpen={isEditPasswordPageOpen}
                pageTitle={'Nome de usuário'}
                togglePage={toggleEditPasswordPageOpen}
                saveAction={savePassword}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome de usuário'
                        value={tempPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                       Insira aqui sua nova senha
                    </p>
                </div>
            </EditInfoPage>
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div onClick={toggleEditPasswordPageOpen}>
                                    <p className="text-whiteT1 text-sm font-semibold">Senha</p>
                                    <InputFieldPurple value={password} readOnly={true} />
                                </div>
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Autenticação de dois fatores (2FA)</p>
                                <ConfigDropDown 
                                    options={options}
                                    defaultOption={options[2]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
