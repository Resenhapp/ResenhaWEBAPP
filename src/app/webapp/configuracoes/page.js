'use client'

import PageHeader from '@/src/components/PageHeader';
import ButtonConfig from '@/src/components/ButtonConfig';
import SearchInput from '@/src/components/SearchInput';
import React from 'react';
import Cookies from 'js-cookie';

export default function Settings() {

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/configuracoes/${pageToGo}`;
        }
    };

    const handleLogOut = () => {
        Cookies.remove('token');
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    };
      
    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Configurações'} /> 
            <div className="flex flex-col items-center justify-start h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-2 flex flex-col pt-4'>
                                {/* <div className='pb-4'>
                                <SearchInput placeholder={"Busque uma configuração"} />
                                </div> */}
                                <ButtonConfig
                                    label="Conta"
                                    action={() => handleNavigation('/conta')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'user02'}
                                    textAlign="left"
                                />
                                <ButtonConfig
                                    label="Segurança"
                                    action={() => handleNavigation('/seguranca')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'shield02'}
                                    textAlign="left"
                                />
                                {/* <ButtonConfig
                                    label="Privacidade"
                                    action={() => handleNavigation('/privacidade')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'lock03'}
                                    textAlign="left"
                                /> */}
                                <ButtonConfig
                                    label="Pagamentos"
                                    action={() => handleNavigation('/pagamentos')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'money02'}
                                    textAlign="left"
                                />
                                {/* <ButtonConfig
                                    label="Notificações"
                                    action={() => handleNavigation('/notificacoes')}
                                    rightIcon={'arrowRight06'}
                                    leftIcon={'bell03'}
                                    textAlign="left"
                                /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className='flex flex-col justify-end mb-10 max-w-md p-4 px-8'>
                <ButtonConfig
                    label="Sair"
                    action={handleLogOut}
                    rightIcon={'arrowRight06'}
                    leftIcon={'user02'}
                    textAlign="left"
                />
            </div>
        </div>
    );
}
