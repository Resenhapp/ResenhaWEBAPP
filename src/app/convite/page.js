'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Button from "@/src/components/Button";
import RoundButton from "@/src/components/RoundButton";
import UserPortrait from "@/src/components/UserPortrait";
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import Vector from "@/src/components/Vector";
import Tag from '@/src/components/Tag';
import { tagsData } from "@/src/components/tagsData";
import Link from '@/src/components/Link';

export default function Invite() {
    const axios = require('axios');
    const qs = require('qs');

    var token = Cookies.get('token');

    const [isExpanded, setIsExpanded] = useState(false);
    const [data, setData] = useState(null);
    const [renderedTags, setRenderedTags] = useState([]);
    const [saved, setSaved] = useState(false);

    let code = '';
    let promoter = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        code = urlParams.get('c');

        if (urlParams.get('p')) {
            promoter = urlParams.get('p');
        }
    }

    const handleNextClick = () => {
        if (typeof window !== 'undefined') {
            let url = `convite/checkout?c=${code}`

            if (promoter != '') {
                url += `&p=${promoter}`
            }

            window.location.href = url;
        }
    };

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getInviteData',
            code: code
        });

        setData(response);

        return response.tags;
    };

    const handleSaveButton = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'switchSaveEvent',
            party: code,
            token: token,
        });

        setSaved(!saved);
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

    const { ticket, date, guests, hour, address, host, title, description, users, tags, hash } = data;

    const renderDescription = () => {
        let processedDescription = description;

        // Replace newline characters (\n) with <br> tags
        processedDescription = processedDescription.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));

        if (isExpanded) {
            return (
                <>
                    <h1>{processedDescription}</h1>
                    <div
                        className="flex flex-row items-center align-center cursor-pointer text-purpleT5"
                        onClick={handleToggleDescription}
                    >
                        <span>Mostrar menos</span>
                        <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                            <Vector vectorname={'verticalArrow01'} />
                        </div>
                    </div>
                </>
            );
        }

        // Use shortDescription as processedDescription for the collapsed view
        let shortDescription = processedDescription;

        if (processedDescription.length > 3) {
            shortDescription = processedDescription.slice(0, 3);
        }

        return (
            <>
                <h1>{shortDescription}</h1>
                {processedDescription.length > 3 && (
                    <div className="flex items-center cursor-pointer text-purpleT5" onClick={handleToggleDescription}>
                        <span>Mostrar mais</span>
                        <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                            <Vector vectorname={'verticalArrow02'} />
                        </div>
                    </div>
                )}
            </>
        );
    };

    const getGoogleMapsURL = (address) => {
        var newAddress = encodeURIComponent(address);

        return `https://www.google.com/maps/search/?api=1&query=${newAddress}`;
    };

    const handleShare = () => {
        const shareData = {
            title: title,
            text: `Que tal colar no ${title}? Só confirmar pelo link: https://resenha.app/convite?c=${code}`,
            url: `https://resenha.app/convite?c=${code}`,
        };

        if (navigator.share) {
            navigator.share(shareData)
        }

        else {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                const shareUrl = `whatsapp://send?text=${encodeURIComponent(`${shareData.title}\n${shareData.text}\n${shareData.url}`)}`;
                if (typeof window !== 'undefined') {
                    window.location.href = shareUrl;
                }
            } else {
                alert("Web Share API not supported on this device");
            }
        }
    };

    const ogTitle = title;
    const ogDescription = description;
    const ogURL = `https://resenha.app/convite?c=${code}`;

    return (
        <div className="flex flex-col justify-center items-center xl:p-4 h-fit bg-purpleT01">
            <section className="relative max-w-[540px] xl:ring-2 xl:ring-purpleT2 xl:rounded-xl xl:drop-shadow-lg">
                {token && (
                    <div className="absolute z-[4] top-4 left-4">
                        <button onClick={() => { window.location.href = `https://resenha.app/feed/`; }} className="w-14 h-14 ring-1 ring-purpleT3 bg-purpleT2 rounded-full align-center items-center flex justify-center">
                            <Vector vectorname={'arrowLeft01'} />
                        </button>
                    </div>
                )}
                {token && (
                    <div className="absolute z-[4] top-4 right-4">
                        <button onClick={handleSaveButton} className="w-14 h-14 ring-1 ring-purpleT3 bg-purpleT2 rounded-full align-center items-center flex justify-center">
                            {saved && <Vector vectorname={'bookmarkOutlined02'} />}
                            {!saved && <Vector vectorname={'bookmarkFill02'} />}
                        </button>
                    </div>
                )}
                <div className="relative">
                    <Image
                        src={`https://media.resenha.app/r/${hash}.png`}
                        alt="Picture of the author"
                        layout=""
                        width={300}
                        height={300}
                        className="object-cover w-full h-[300px] xl:rounded-t-xl"
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
                                Por: <b>{host.name}</b>
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
                                        href={getGoogleMapsURL(address)}
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
                            {/* LINKS
                            <div className="mt-4 gap-1 flex flex-col">
                                <p className='font-bold'>Links:</p>
                                <div className='flex flex-wrap gap-2 w-full'>
                                    <Link className="w-full" href="https://chat.whatsapp.com/H38lFdIgGt6K8NjkDqVUSP" title={'Grupo do whats'} />
                                    <Link className="w-full" href="https://www.instagram.com/app.resenha" title={'Insta'} />
                                </div>
                            </div> */}
                            <div className="mt-4">
                                <h1 className="font-bold mb-1">
                                    Tags:
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    {renderedTags.map((tag) => (
                                        <div key={tag.id}>
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 py-4 w-full">
                                <div className="flex flex-col w-fit">
                                    <RoundButton white={false} label="" icon="share" onClick={handleShare} />
                                </div>
                                <div className="flex flex-col w-full">
                                    <Button
                                        label={guests.confirmed == guests.capacity ? 'Esgotou!' : 'Comprar!'}
                                        icon={guests.confirmed == guests.capacity ? 'shield' : 'arrow'}
                                        action={guests.confirmed == guests.capacity ? null : handleNextClick}
                                        iconSide={'right'}
                                        height={1}
                                        width={1}
                                        textAlign='center'
                                        disabled={guests.confirmed == guests.capacity}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col mb-4 w-full">
                                {users.length > 0 && (
                                    <div>
                                        <h1 className="text-whiteT1 text-xl font-bold w-full text-left">
                                            Quem vai:
                                        </h1>
                                        <div className="flex overflow-x-auto space-x-4 py-2 h-fit w-full">
                                            {users.map((user, index) => (
                                                    <UserPortrait
                                                        isBlurried={false} // index >= 5
                                                        imageUrl={`https://media.resenha.app/u/${user.hash}.png`}
                                                        userName={user.username}
                                                        userId={user.id}
                                                        key={user.id}
                                                    />
                                            ))}
                                        </div>

                                    </div>
                                )}
                            </div>
                            <div className="justify-center align-center w-full max-w-screen-xs flex mb-3">
                                <h1 className="font-regular">
                                    Feito com: <a href="https://www.resenha.app/"><b><u>Resenha.app</u></b></a>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}