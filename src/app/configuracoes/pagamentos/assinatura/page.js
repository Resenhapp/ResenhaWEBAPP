'use client'

import PageHeader from '@/src/components/PageHeader';
import SignatureSelection from '@/src/components/SignatureSelection';

import React, { useState } from 'react';

export default function Signature() {
    const [selectedCard, setSelectedCard] = useState(0);

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const handleCheck = (index) => (isChecked) => {
        if (isChecked) {
            setSelectedCard(index);
            return true;
        } else if (index === selectedCard) {
            return false;
        }
        return true;
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Assinaturas" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <SignatureSelection signatureType={1} startSelected={selectedCard === 0} onCheck={handleCheck(0)} />
                                {/* <SignatureSelection signatureType={2} startSelected={selectedCard === 1} onCheck={handleCheck(1)} /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
