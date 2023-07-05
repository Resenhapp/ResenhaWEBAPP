'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';
import PartyBanner from '@/src/components/PartyBanner';

export const metadata = {
    title: 'Resenha.app • Resenhas salvas',
    description: 'Venha fazer suas resenhas!',
}

export default function AccountPartySaved() {

    const exampleNameEvent = "BAILE FUNK NA...";
    const exampleDateEvent = "16/09/2023";
    const exampleHourEvent = "20";
    const exampleGuestsEvent = "10";
    const exampleLimitEvent = "100";
    const exampleImageEvent = "https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png";
    const examplePriceEvent = 100;
    const exampleSavedEvent = 'delete';
    const exampleTagsEvent = [0, 1]

    const exampleImagesEvent = ['https://resenha.app/publico/recursos/imagens/u/fe.jpg', 'https://resenha.app/publico/recursos/imagens/u/fe.jpg', 'https://resenha.app/publico/recursos/imagens/u/fe.jpg']


    const handleSaveButton = () => {

    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader pageTitle="Resenhas salvas" isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <PartyBanner imageUrl={exampleImagesEvent} 
                                eventName={exampleNameEvent} 
                                eventImage={exampleImageEvent} 
                                eventDate={exampleDateEvent} 
                                eventHour={exampleHourEvent} 
                                eventGuests={exampleGuestsEvent} 
                                eventMax={exampleLimitEvent} 
                                eventPrice={examplePriceEvent} 
                                eventSaved={exampleSavedEvent} 
                                eventTags={exampleTagsEvent} 
                                handleSaveButton={handleSaveButton}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}