'use client'
import React from 'react';
import ConciergePortrait from '@/src/components/ConciergePortrait';
import PopUp from '@/src/components/popUp';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Recepcionistas',
    description: 'Venha fazer suas resenhas!',
}
export default function Concierges() {
    
    function RemoveConcierge() {
    }

    const conciergeNameTest = "Claudio";
    const defaultProfileImage = "https://resenha.app/publico/recursos/imagens/default_concierge.png";
    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Recepcionistas'} />
            <PopUp icon={'question'} iconColor={'purple'} onActionClick={RemoveConcierge()} title={'Excluir recepcionista?'}
                text={`Você tem certeza de que quer excluir ${conciergeNameTest} da lista de Recepcionistas? `}
                actionTitle={'Excluir'} buttonColor={'red'} />

            <div className="flex flex-col items-centser justify-center h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='h3 w-full flex '>
                        <div className='w-full flex flex-col '>
                            <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'} />
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'} />
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
