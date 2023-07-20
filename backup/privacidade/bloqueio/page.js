'use client'
import React, {useState} from 'react';
import PageHeader from '@/src/components/PageHeader';
import ConfigDropDown from '@/src/components/ConfigDropDown';
import BlockedUserNotification from '@/src/components/BlockedUserNotification';

export const metadata = {
    title: 'Resenha.app • Configurações de bloqueio',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function BlockConfig() {

    const blockedUserCan = ['Nada', 'Comprar convites']
    const [method, setMethod] = useState('');

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };

    const handleUnblockUser = () => {
        
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Config. de bloqueio" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <p className="text-whiteT1 text-sm font-semibold">Usuários bloqueados podem</p>
                                <ConfigDropDown
                                    options={blockedUserCan}
                                    defaultOption={blockedUserCan[0]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Lista de usuários bloqueados</p>
                                <BlockedUserNotification
                                    imageUrl={'https://resenha.app/publico/recursos/imagens/u/qe.jpg'}
                                    title={'Bianca Valentim'}
                                    description={'Você bloqueou este usuário. Ele participou da sua última resenha.'}
                                    date={'Hoje'}
                                    hour={'21:57'}
                                    sbutton={true}
                                    onButtonClick={handleUnblockUser}
                                />
                                <BlockedUserNotification
                                    imageUrl={'https://resenha.app/publico/recursos/imagens/u/qw.jpg'}
                                    title={'Fernando Miguel'}
                                    description={'Você bloqueou este usuário. Ele nunca participou de uma resenha sua.'}
                                    date={'11 de Janeiro'}
                                    hour={'18:57'}
                                    sbutton={true}
                                    onButtonClick={handleUnblockUser}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}