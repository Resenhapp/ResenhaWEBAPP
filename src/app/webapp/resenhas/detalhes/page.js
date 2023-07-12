'use client'

import PageHeader from "@/src/components/PageHeader"
import Vector from "@/src/components/Vector"

export default function EventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const partyCode = urlParams.get('r');
    
    console.log(partyCode);

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader
                pageTitle={'Detalhes'}
                isBack={true}
                checker={() => { null }}
            />
            <div className="px-8 flex flex-col">
                <div className="mt-8">
                    <p className="font-bold text-lg">Geral</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <p className="text-2xl font-bold">Resenha no terraço</p>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'calendar04'} />Data: </p>
                                <p className="text-lg font-bold">20/05/2023</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'user04'} />Confirmados: </p>
                                <p className="text-lg font-bold">19/100</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'star02'} />VIPs: </p>
                            <p className="text-lg font-bold">09/10</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Faturamento</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'card02'} />Cartão: </p>
                                <p className="text-lg font-bold">R$ 245,56</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'pix01'} />PIX: </p>
                                <p className="text-lg font-bold">R$ 185,56</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'money03'} />Dinheiro: </p>
                            <p className="text-lg font-bold">R$ 845,56</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Impressões</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <p className="text-2xl font-bold">Resenha no terraço</p>
                        <div className="flex flex-col gap-1">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye01'} />Impressões nas últimas 5h</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye02'} />Abriram o convite</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'coin01'} />Compraram suas entradas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}