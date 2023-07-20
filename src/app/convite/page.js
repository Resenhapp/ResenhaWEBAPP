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
import Loading from "@/src/components/Loading";
import Vector from "@/src/components/Vector";
import Tag from '@/src/components/Tag';
import { tagsData } from "@/src/components/tagsData";

export default function Invite() {
    const axios = require('axios');
    const qs = require('qs');

    const [isExpanded, setIsExpanded] = useState(false);
    const [data, setData] = useState(null);
    const [renderedTags, setRenderedTags] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    const handleNextClick = () => {
        Cookies.set('code', code);

        window.location.href = 'convite/dados/';
    };

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

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
            const response = await makeRequest('http://localhost/resenha.app/api/', { 
                request: 'getInviteData', 
                code: code 
            });

            setData(response);
      
            return response.tags;
        } 
        
        catch (error) {
          console.error(error);
        }
    };
      
    
    useEffect(() => {
        const getRenderedTags = async () => {
            const tags = await fetchData();
            const eventTags = tags.map((tag) => parseInt(tag, 10));
            const allTags = [...tagsData].map((tag) => {
            const isSelected = eventTags.includes(tag.id);
            return { ...tag, selected: isSelected };
            }).sort((a, b) => b.selected - a.selected);
            const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
            const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));
        
            setRenderedTags(renderTags);
        };
        
        getRenderedTags();
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    const { ticket, date, guests, hour, address, host, title, description, users, tags } = data;

    const renderDescription = () => {
        if (isExpanded) {
            return (
                <>
                    <h1>{description}<div className="mt-4"></div></h1>
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
        let text = ''
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
        return `https://www.google.com/maps/search/?api=1&query=${newAddress}`;
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
                })
                .catch((error) => {
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
        <div className="flex flex-col justify-start min-h-screen h-fit relative bg-purpleT01">
            <section className="relative">
                <div className="relative">
                    <Image
                        src="https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png"
                        alt="Picture of the author"
                        layout=""
                        width={300}
                        height={300}
                        className="object-cover w-full h-[300px]"
                    />
                    <div className="absolute inset-0">
                        <div className="absolute bottom-[-1px] bg-gradient-to-t from-purpleT01 opacity-100 w-full h-2/5" />
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
                                <span className="mr-1">R$</span>{ticket}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-start gap-2 w-full h-fit">
                            <div className="flex-column justify-left text-whiteT1 items-center">
                                <h1 className="font-bold">
                                    {date.dayString}
                                </h1>
                                <h1> {date.day} {'de ' + date.monthString} </h1>
                            </div>
                            <div className="w-[1px] bg-purpleT5 mx-1" />
                            <div className="flex-column justify-left text-whiteT1 items-center">
                                <h1 className="font-bold">
                                    Horário
                                </h1>
                                <h1>
                                    {'às ' + hour.start}
                                </h1>
                            </div>
                            <div className="w-[1px] bg-purpleT5 mx-1" />
                            <div className="flex-column justify-left text-whiteT1 items-center">
                                <h1 className="font-bold">
                                    Confirmados
                                </h1>
                                <h1>
                                    {guests.confirmed}/{guests.capacity}
                                </h1>
                            </div>
                        </div>
                        <div className="flex-column justify-left text-whiteT1 items-center">
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
                        <div className="flex-column justify-left max-w-screen-xs text-whiteT1 items-center">
                            <div>
                                <h1 className="font-bold">
                                    Descrição:
                                </h1>
                                {renderDescription()}
                            </div>
                            <div className="mt-4">
                                <h1 className="font-bold mb-1">
                                        Tags:
                                    </h1>
                                <div className="flex flex-wrap gap-2">
                                    {renderedTags.map((tag) => (
                                        <Tag
                                            key={tag.id}
                                            tagname={tag.name}
                                            type={tag.type}
                                            colorName={tag.colorName}
                                            highlightColor={tag.highlightColor}
                                            isEditable={false}
                                            ringThickness={tag.ringThickness}
                                            ringColor={tag.ringColor}
                                            weight={tag.weight}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row mb-4 gap-4 w-full mt-4">
                                <div className="flex flex-col mb-4 w-fit">
                                    <RoundButton white={false} label="" icon="share" onClick={handleShare} />
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
                            <div className="flex flex-col mb-4 w-full">
                                <h1 className="text-whiteT1 text-xl font-bold w-full text-left">
                                    Quem vai:
                                </h1>
                                <div className="bg-scroll flex py-2 flex-row overflow-x-auto gap-0 w-full">
                                    {users.map((user) => (
                                        <UserPortrait isBlurried={false} imageUrl={`https://media.resenha.app/u/${user.hash}.png`} userName={user.username} userId={user.id}/>
                                    ))}
                                </div>
                            </div>
                            <div className="justify-center align-center w-full max-w-screen-xs flex mb-3">
                                <h1 className="font-regular">
                                    Feito com: <a href="https://resenha.app"><b><u>Resenha.app</u></b></a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
}