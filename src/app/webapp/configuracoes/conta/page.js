'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';

export const metadata = {
    title: 'Resenha.app • Conta',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function Account() {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/configuracoes/conta/${pageToGo}`;
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Conta" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <Button
                                    label="Detalhes da conta"
                                    action={() => handleNavigation('/detalhes')}
                                    iconSide="right"
                                    icon={'arrow'}
                                    height={1}
                                    width={1}
                                    textAlign="left"
                                />
                                <Button
                                    label="Informações pessoais"
                                    action={() => handleNavigation('/informacoes')}
                                    iconSide="right"
                                    icon={'arrow'}
                                    height={1}
                                    width={1}
                                    textAlign="left"
                                />
                                <Button
                                    label="Histórico de atividades"
                                    action={() => handleNavigation('/historico')}
                                    iconSide="right"
                                    icon={'arrow'}
                                    height={1}
                                    width={1}
                                    textAlign="left"
                                />
                                <Button
                                    label="Resenhas salvas"
                                    action={() => handleNavigation('/resenhas')}
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
