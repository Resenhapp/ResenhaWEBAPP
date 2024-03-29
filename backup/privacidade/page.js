'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import ButtonConfig from '@/src/components/ButtonConfig';

export default function Privacy() {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/configuracoes/privacidade/${pageToGo}`;
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Privacidade" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <ButtonConfig
                                    label="Visibilidade da conta"
                                    action={() => handleNavigation('/visibilidade')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Configurações de bloqueio"
                                    action={() => handleNavigation('/bloqueio')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Gerenciamento de dados"
                                    action={() => handleNavigation('/dados')}
                                    rightIcon={'arrowRight06'}
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
