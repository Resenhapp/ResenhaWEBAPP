'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import CreditCardSelection from '@/src/components/CreditCardSelection';

export const metadata = {
    title: 'Resenha.app • Cartões salvos',
    description: 'Venha fazer suas resenhas!',
}

export default function CreditCards() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    const [selectedCard, setSelectedCard] = useState(0);

    const handleCheck = (index) => (isChecked) => {
        if (isChecked) {
            setSelectedCard(index);
            return true;
        } else if (index === selectedCard) {
            alert("Você precisa ter ao menos um cartão selecionado");
            return false;
        }
        return true;
    };
    
    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Cartões salvos" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <CreditCardSelection ccFinal={1234} ccFlag={1} ccName={'Noh'} ccType={'Credito'} ccUsage={2} startSelected={selectedCard === 0} onCheck={handleCheck(0)} />
                                <CreditCardSelection ccFinal={1234} ccFlag={1} ccName={'Noh'} ccType={'Credito'} ccUsage={2} startSelected={selectedCard === 1} onCheck={handleCheck(1)} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
