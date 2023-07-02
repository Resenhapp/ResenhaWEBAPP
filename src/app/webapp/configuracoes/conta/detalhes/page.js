'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import InputFieldPurple from '@/src/components/InputFieldPurple';

export const metadata = {
    title: 'Resenha.app • Detalhes da conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/configuracoes/${pageToGo}`;
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Detalhes da conta" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <InputField />
                                <InputFieldPurple />
                                <hr className='border-purpleT4' />
                                <Button
                                    label="Detalhes da conta"
                                    action={() => handleNavigation('conta/detalhes')}
                                    iconSide="right"
                                    icon={'arrow'}
                                    height={1}
                                    width={1}
                                    textAlign="left"
                                />
                                <Button
                                    label="Resenhas salvas"
                                    action={() => handleNavigation('conta/resenhas')}
                                    iconSide="right"
                                    icon={'arrow'}
                                    height={1}
                                    width={1}
                                    textAlign="left"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
