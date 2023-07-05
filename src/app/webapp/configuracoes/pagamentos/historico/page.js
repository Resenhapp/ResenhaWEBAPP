'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import NotificationBase from '@/src/components/NotificationBase';

export const metadata = {
    title: 'Resenha.app • Histórico de Compras',
    description: 'Detalhes da conta, informações pessoais, histórico de atividades e resenhas salvas.',
};

export default function BuyHistory() {

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Hist. de compras" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <NotificationBase
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png'}
                                    title={'Compra de entrada'}
                                    description={'Você pagou R$ 50,00 pela entrada da RESENHA NA CAVALHADA. Seu código é 5902'}
                                    date={'Hoje'}
                                    hour={'23:50'}
                                />
                                <NotificationBase
                                    imageUrl={'https://resenha.app/publico/recursos/resenhas/dEUsxUJp.png'}
                                    title={'Compra de entrada'}
                                    description={'Você pagou R$ 250,00 pela entrada da MATUÊ - Porto Alegre. Seu código é 6478'}
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