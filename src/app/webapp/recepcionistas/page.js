'use client'
import React from 'react';
import ConciergePortrait from '@/src/components/ConciergePortrait';
import PopUp from '@/src/components/popUp';
import PageHeader from '@/src/components/PageHeader';
import Button from '@/src/components/Button';

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
                actionTitle={'Excluir'} buttonColor={'red'} showStatus={false}/>
            <div className="flex flex-col items-centser justify-center h-screen px-4 ">
                <section className="flex flex-col w-full max-w-md p-4 ">
                    <div className='h3 w-full flex '>
                        <div className='w-full flex flex-col '>
                            <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio Grandao'} conciergeToken={'QEWF34'} />
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} />
                                <ConciergePortrait imgUrl={defaultProfileImage}
                                    activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} />
                            </div>
                        </div>
                    </div>
                <div className="flex flex-col mb-4 w-full mt-8 items-center justify-center content-center">
                    <Button label={'Novo recepcionista'} icon={'arrow'} action={() => window.open("https://wa.me/5551998261235?text=Ol%C3%A1%2C+quero+criar+e+gerenciar+minhas+resenhas+com+o+Resenha.app", "_blank")} iconSide='right' height={1} width={1} textAlign='center' />
                </div>
                </section>
            </div>
        </div>
    );
}
