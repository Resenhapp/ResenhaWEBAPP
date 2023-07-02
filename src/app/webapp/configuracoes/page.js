'use client'
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';
import ButtonConfig from '@/src/components/ButtonConfig';
import React from 'react';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}

export default function Settings() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/configuracoes/${pageToGo}`;
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Configurações'} /> 
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-2 flex flex-col'>
                                <ButtonConfig
                                    label="Conta"
                                    action={() => handleNavigation('/conta')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'user03'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Segurança"
                                    action={() => handleNavigation('/seguranca')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'shield02'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Privacidade"
                                    action={() => handleNavigation('/privacidade')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'lock03'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Pagamentos"
                                    action={() => handleNavigation('/pagamentos')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'money02'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Notificações"
                                    action={() => handleNavigation('/notificacoes')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'bell03'}
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
