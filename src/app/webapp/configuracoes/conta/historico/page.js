'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import NotificationBase from '@/src/components/NotificationBase';

export const metadata = {
    title: 'Resenha.app • Histórico de atividades',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function AccountHistory() {

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Hist. de atividades" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <NotificationBase
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png'}
                                    title={'Resenha criada!'}
                                    description={'A resenha Resenha no Terraço foi criada com sucesso.'}
                                    date={'Hoje'}
                                    hour={'17:00'}
                                />
                                <NotificationBase
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/dEUsxUJp.png'}
                                    title={'Presença confirmada!'}
                                    description={'Sua presença no MATUÊ - Porto Alegre  foi confirmada! Seu código é 6478.'}
                                    date={'09 de junho'}
                                    hour={'14:28'}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
