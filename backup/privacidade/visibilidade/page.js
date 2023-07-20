'use client'
import React, {useState} from 'react';
import PageHeader from '@/src/components/PageHeader';
import ConfigDropDown from '@/src/components/ConfigDropDown';

export const metadata = {
    title: 'Resenha.app • Visibilidade da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function PrivacyVisibility() {

    const whoSeeProfileOptions = ['Todos', 'Apenas seguidores']
    const whoSendMessage = ['Todos', 'Apenas seguidores']
    const whoEnterParty = ['Todos', 'Apenas seguidores']
    const [method, setMethod] = useState('');

    const handleSelectChange = (event) => {
        setMethod(event.target.value);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Visibil. da conta" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <p className="text-whiteT1 text-sm font-semibold">Quem pode ver meu perfil</p>
                                <ConfigDropDown
                                    options={whoSeeProfileOptions}
                                    defaultOption={whoSeeProfileOptions[0]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Quem pode ver meu perfil</p>
                                <ConfigDropDown
                                    options={whoSendMessage}
                                    defaultOption={whoSendMessage[0]}  //Também possível colocar apenas a string da array options
                                    action={handleSelectChange}
                                />
                                <hr className="border-purpleT4" />
                                <p className="text-whiteT1 text-sm font-semibold">Quem pode ver meu perfil</p>
                                <ConfigDropDown
                                    options={whoEnterParty}
                                    defaultOption={whoEnterParty[1]}  //Também possível colocar apenas a string da array options
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