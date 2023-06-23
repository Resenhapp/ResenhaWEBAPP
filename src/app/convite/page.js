'use client'
import Image from "next/image";
import defaultImage from "@/assets/images/default.jpg";
import Button from "@/src/components/Button";
import RoundButton from "@/src/components/RoundButton";
import { useState } from "react";
import UserPortrait from "@/src/components/UserPortrait";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Vector from "@/src/components/Vector";

export default function Invite() {
    let code = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get('code');
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [data, setData] = useState(null);

    const handleNextClick = () => {
        Cookies.set('code', code);

        window.location.href = 'convite/dados/';
    };

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const axios = require('axios');
    const qs = require('qs');

    const makeRequest = async (url, data) => {
        try {
            const response = await axios.post(url, qs.stringify(data));
            return response.data;
        }

        catch (error) {
            throw new Error(`Request failed: ${error}`);
        }
    };

    const fetchData = async () => {
        try {
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getInviteData', code: code });
            console.log(response);
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <p className="text-4xl">Carregando...</p>
            </div>
        );
    }

    const { pricePerItem, month, year, day, confirmed, maxguests, hour, address, host, title, description, dayOfWeek, users } = data;

    const renderDescription = () => {
        if (isExpanded) {
            return (
                <>
                    <h1>{description}</h1>
                    <div
                        className="flex flex-row items-center align-center cursor-pointer text-purpleT5"
                        onClick={handleToggleDescription}
                    >
                        <span>Mostrar menos</span>
                        <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                            <Vector vectorname={'verticalArrow01'} />
                        </div>
                    </div >

                </>
            );
        }

        let shortDescription = description;

        if (description.length > 80) {
            shortDescription = description.slice(0, 80) + '...';
        }

        return (
            <>
                <h1>{shortDescription}</h1>
                <div
                    className="flex items-center cursor-pointer text-purpleT5"
                    onClick={handleToggleDescription}
                >
                    <span>Mostrar mais</span>
                    <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                        <Vector vectorname={'verticalArrow02'} />
                    </div>
                </div>
            </>
        );
    };

    const isIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    };

    const getAppleMapsURL = (address) => {
        var newAddress = encodeURIComponent(address);
        return `maps://maps.apple.com/?q=${newAddress}`;
    };

    const getGoogleMapsURL = (address) => {
        var newAddress = encodeURIComponent(address);
        return `https://www.google.com/maps/search/?api=1&query=${newAddress}`;
    };

    const handleShare = () => {
        const shareData = {
            title: title,
            text: `Confira essa incrível ${title}!`,
            url: "https://example.com/resenha",
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => {
                    console.log("Invite shared successfully");
                })
                .catch((error) => {
                    console.error("Error sharing invite:", error);
                });
        } else {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                const shareUrl = `whatsapp://send?text=${encodeURIComponent(`${shareData.title}\n${shareData.text}\n${shareData.url}`)}`;
                window.location.href = shareUrl;
            } else {
                alert("Web Share API not supported on this device");
            }
        }
    };


    return (
        <div className="flex flex-col justify-start min-h-screen h-fit relative">
            <section className="relative">
                <div className="relative">
                    <Image
                        src="https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png"
                        alt="Picture of the author"
                        layout="responsive"
                        width={5000}
                        height={3000}
                        className="object-cover"
                    />
                    <div className="absolute inset-0">
                        <div className="absolute bottom-0 bg-gradient-to-t from-purpleT1 opacity-100 w-full h-2/5" />
                    </div>
                </div>

                <div className="px-6 py-4">
                    <div className="w-full flex flex-row justify-between max-w-screen-xs items-start">
                        <div className="w-fit">
                            <h1 className="text-xl font-bold mr-2 text-whiteT1">
                                {title}
                            </h1>
                            <p className="text-sm mb-4 text-purpleT5">
                                Por: <b>{host}</b>
                            </p>
                        </div>
                        <div className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                            <h1 className="text-purpleT2 text-center font-bold">
                                <span className="mr-1">R$</span>{pricePerItem}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-left gap-6 w-full h-fit">
                            <div className="flex-column justify-left text-purple-100 items-center px-2">
                                <h1 className="font-bold">
                                    {'Dia ' + day}
                                </h1>
                                <h1>  {'de ' + month} </h1>
                            </div>
                            <div className="flex-column justify-left text-purple-100 items-center px-2">
                                <h1 className="font-bold">
                                    {dayOfWeek}
                                </h1>
                                <h1>
                                    {'às ' + hour}
                                </h1>
                            </div>
                            <div className="flex-column justify-left text-purple-100 items-center px-2">
                                <h1 className="font-bold">
                                    Confirmados
                                </h1>
                                <h1>
                                    {confirmed}/{maxguests}
                                </h1>
                            </div>
                        </div>
                        <div className="flex-column justify-left text-purple-100 items-center">
                            <div>
                                <h1 className="font-bold">
                                    Endereço:
                                </h1>
                                <h1>
                                    <a
                                        href={isIOS() ? getAppleMapsURL() : getGoogleMapsURL()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {address}
                                    </a>
                                </h1>
                            </div>
                        </div>
                        <div className="flex-column justify-left max-w-screen-xs text-purple-100 items-center">
                            <div>
                                {renderDescription()}
                            </div>
                            <div className="flex flex-row mb-4 gap-4 w-full mt-4">
                                <div className="flex flex-col mb-4 w-fit">
                                    <RoundButton label="" icon="share" onClick={handleShare} />
                                </div>
                                <div className="flex flex-col mb-4 w-full">
                                    <Button
                                        label="Tô dentro!"
                                        icon="arrow"
                                        action={handleNextClick}
                                        iconSide='right'
                                        height={1}
                                        width={1}
                                        textAlign='center'
                                    />

                                </div>
                            </div>
                            <div className="flex flex-col mb-4 gap-4 w-full">
                                <div className="flex justify-center flex-row mb-2 gap-4 h-fit w-full">
                                    <h1 className="text-whiteT1 text-2xl font-bold w-full text-left">
                                        Quem vai:
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4 h-[550px] overflow-y-auto">
    {users.map((user) => (
      <UserPortrait key={user.id} image={defaultImage} name={user.name} />
    ))}
  </div>
                            </div>
                            <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                                <h1 className="font-regular">
                                    Feito com: <a href="https://resenha.app"><b><u>Resenha.app</u></b></a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}