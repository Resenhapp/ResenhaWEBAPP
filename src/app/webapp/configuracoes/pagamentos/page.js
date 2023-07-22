'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import ButtonConfig from '@/src/components/ButtonConfig';

export default function Payments() {
    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/configuracoes/pagamentos/${pageToGo}`;
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Pagamentos" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                {/* <ButtonConfig
                                    label="Cartões salvos"
                                    action={() => handleNavigation('/cartoes')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                /> */}
                                <ButtonConfig
                                    label="Histórico de compras"
                                    action={() => handleNavigation('/historico')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Assinaturas ativas"
                                    action={() => handleNavigation('/assinatura')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                />
                                {/* <ButtonConfig
                                    label="Configurações de reembolso"
                                    action={() => handleNavigation('/reembolso')}
                                    rightIcon={'arrowRight06'}
                                    textAlign="left"
                                /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
