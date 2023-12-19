'use client'

import PageHeader from "@/src/components/PageHeader"
import Vector from "@/src/components/Vector"
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import React from 'react';

import { useEffect, useState } from 'react';
import PartyGuest from "@/src/components/PartyGuest";

export default function EventDetails() {
    var token = Cookies.get('token');

    let urlParams = new URLSearchParams();
    var partyCode = '';

    const [showRemoveGuestModal, setShowRemoveGuestModal] = useState(false);

    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        partyCode = urlParams.get('r');
    }

    const axios = require('axios');
    const qs = require('qs');

    const [data, setData] = useState(null);

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getInviteData',
            token: token,
            code: partyCode
        });

        setData(response);
    };

    const handleCopyClick = async (party) => {
        const partyUrl = `https://resenha.app/convite?c=${party}`;

        const copyData = {
            text: `Que tal colar na minha resenha? Só confirmar pelo link: `,
            url: `${partyUrl}`,
        };

        const fullTextToCopy = `${copyData.text}${copyData.url}`;

        await navigator.clipboard.writeText(fullTextToCopy);
    };

    const handleOpenClick = async (party) => {
        window.location.href = `https://resenha.app/convite?c=${party}`;
    };

    useEffect(() => {
        if (showRemoveGuestModal) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showRemoveGuestModal]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    if (data.error) {
        return (
            <div className="h-screen w-full flex flex-col justify-between content-center items-center">
                <PageHeader
                    pageTitle={'Detalhes'}
                    isBack={true}
                    checker={() => { null }}
                />
                <h1 className="w-[90%] h-full flex justify-center items-center content-center text-3xl text-center">
                    Desculpe, esta resenha não existe ou foi excluída. 🫤
                </h1>
            </div>
        )
    }

    var { guests, date, income, impressions } = data

    return (
        <div className='flex flex-col w-screen h-screen'>
            {showRemoveGuestModal && <div className="w-screen h-screen z-[9999] bg-[#00000093] flex backdrop-blur-md absolute items-center content-center justify-center">
                <div className="w-[90%] bg-purpleT0 ring-1 ring-inset ring-purpleT3 rounded-xl p-5">
                    <p className="text-center text-xl font-bold">Você tem certeza de que deseja remover esta pessoa?</p>
                    <p className="text-center text-sm text-redT3"> (Esta ação não poderá ser desefeita.)</p>
                    <div className="flex flex-col mt-4 items-center content-center justify-center">
                        <button onClick={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} className="bg-whiteT1 text-purpleT0 w-fit px-4 py-2 rounded-full font-medium">Não, cancelar</button>
                        <button onClick={() => removeGuest()} className="bg-transparent text-whiteT1 w-fit px-4 py-2 rounded-full font-medium">Sim, excluir</button>
                    </div>
                </div>
            </div>}
            <PageHeader
                pageTitle={'Detalhes'}
                isBack={true}
                checker={() => { null }}
            />
            <div className="px-8 flex flex-col">
                <div className="mt-8">
                    <p className="font-bold text-lg">Geral</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <p className="text-2xl font-bold">{data.title}</p>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'calendar04'} />Data: </p>
                                <p className="text-lg font-bold">{date.day}/{date.month}/{date.year}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'user04'} />Confirmados: </p>
                                <p className="text-lg font-bold">{guests.confirmed}/{guests.capacity}</p>
                            </div>
                        </div>
                        {/* <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'star02'} />VIPs: </p>
                            <p className="text-lg font-bold">09/10</p>
                        </div> */}
                        <div className="w-full flex flex-row gap-2">
                            <button onClick={() => { handleCopyClick(partyCode) }} className='bg-transparent flex ring-whiteT1 px-2 ring-inset rounded-full ring-1 w-full gap-2 py-1 align-center justify-center items-center'>
                                <p>Copiar</p><Vector vectorname={'copy01'} />
                            </button>
                            <button onClick={() => { handleOpenClick(partyCode) }} className='bg-transparent flex ring-whiteT1 px-2 ring-inset rounded-full ring-1 w-full gap-2 py-1 align-center justify-center items-center'>
                                <p>Ver</p><Vector vectorname={'eye02'} />
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Faturamento</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'card02'} />Cartão: </p>
                                <p className="text-lg font-bold">R$ {income.card}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="flex flex-row items-center gap-1"><Vector vectorname={'pix01'} />PIX: </p>
                                <p className="text-lg font-bold">R$ {income.pix}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'money03'} />Dinheiro: </p>
                            <p className="text-lg font-bold">R$ {income.cash}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col">
                        <p className="font-bold text-lg">Participantes</p>
                        {/* <input className="w-full bg-transparent ring-1 ring-white rounded-full mb-2 py-1 px-3" placeholder="buscar participante"/> */}
                    </div>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <div className="flex flex-col gap-1 overflow-auto h-60">
                            <PartyGuest isFirst={true} paidStatus={true} guestName={'Joao Davi'} username={'joaodavisn'} />
                            <PartyGuest isFirst={false} paidStatus={true} isLast={false} guestName={'Joao Davi'} username={'joaodavisn'} onRemove={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} />
                            <PartyGuest isFirst={false} paidStatus={false} isLast={false} guestName={'Joao Davi'} username={'joaodavisn'} onRemove={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} />
                            <PartyGuest isFirst={false} paidStatus={true} isLast={false} guestName={'Joao Davi'} username={'joaodavisn'} onRemove={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} />
                            <PartyGuest isFirst={false} paidStatus={true} isLast={false} guestName={'Joao Davi'} username={'joaodavisn'} onRemove={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} />
                            <PartyGuest isFirst={false} paidStatus={true} isLast={true} guestName={'Joao Davi'} username={'joaodavisn'} onRemove={() => { setShowRemoveGuestModal(!showRemoveGuestModal) }} />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold text-lg">Impressões</p>
                    <div className="bg-purpleT1 ring-inset ring-1 ring-purpleT2 rounded-2xl px-4 py-2 gap-2 flex flex-col">
                        <div className="flex flex-col gap-1">
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye01'} />
                                {impressions.views} impressões</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'eye02'} />
                                {impressions.clicks} pessoas abriram o convite</p>
                            <p className="flex flex-row items-center gap-1"><Vector vectorname={'coin01'} />
                                {impressions.purchases} pessoas compraram entradas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}