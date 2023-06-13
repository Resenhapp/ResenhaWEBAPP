'use client'
import Image from "next/image";
import defaultImage from "@/assets/images/default.jpg";
import Button from "@/src/components/Button";
import RoundButton from "@/src/components/RoundButton";
import { useState } from "react";
import UserPortrait from "@/src/components/UserPortrait";
export default function Invite() {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    var price = '123,55';
    var date = 12;
    var month = 'agosto';
    var year = 2023;
    var day = 'Sábado';
    var confirmed = 12;
    var maxguests = 100;
    var hour = '20:00';
    var address = 'Rua Ramiro Barcelos 1450';

    const renderDescription = () => {
        var descriptionText = `🎉 Estamos trazendo para você uma noite inesquecível de celebração e alegria! Apresentamos a nossa grande festa com bebidas totalmente liberadas! 🍸🍻 Isso mesmo, o bar estará aberto para você se deleitar com seus coquetéis favoritos, cervejas e muito mais - sem limites!`;
        if (isExpanded) {
            return (
                <>
                    <h1>{descriptionText}</h1>
                    <div
                        className="flex flex-row items-center align-center cursor-pointer text-purpleT5"
                        onClick={handleToggleDescription}
                    >
                        <span>Mostrar menos</span>
                        <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.85355 1.14645C5.65829 0.951185 5.34171 0.951184 5.14645 1.14645L0.853553 5.43934C0.658291 5.6346 0.341709 5.6346 0.146447 5.43934C-0.0488155 5.24408 -0.0488155 4.9275 0.146447 4.73223L4.43934 0.439339C5.02513 -0.146447 5.97487 -0.146446 6.56066 0.43934L10.8536 4.73223C11.0488 4.9275 11.0488 5.24408 10.8536 5.43934C10.6583 5.6346 10.3417 5.6346 10.1464 5.43934L5.85355 1.14645Z" fill="#D6A3FF" />
                            </svg>
                        </div>
                    </div >

                </>
            );
        }

        const shortDescription = descriptionText.slice(0, 80) + '...';
        return (
            <>
                <h1>{shortDescription}</h1>
                <div
                    className="flex items-center cursor-pointer text-purpleT5"
                    onClick={handleToggleDescription}
                >
                    <span>Mostrar mais</span>
                    <div className="align-center justify-center items-center flex flex-col h-4 w-4 ml-1">
                        <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.85355 4.43934C5.65829 4.6346 5.34171 4.6346 5.14645 4.43934L0.853553 0.146447C0.658291 -0.0488156 0.341709 -0.0488156 0.146447 0.146447C-0.0488155 0.341709 -0.0488155 0.658291 0.146447 0.853553L4.43934 5.14645C5.02513 5.73223 5.97487 5.73223 6.56066 5.14645L10.8536 0.853553C11.0488 0.658291 11.0488 0.341709 10.8536 0.146447C10.6583 -0.0488156 10.3417 -0.0488156 10.1464 0.146447L5.85355 4.43934Z" fill="#D6A3FF" />
                        </svg>
                    </div>
                </div>
            </>
        );
    };

    const isIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    };

    const getAppleMapsURL = () => {
        const address = encodeURIComponent('Rua Ramiro barcelos 1450');
        return `maps://maps.apple.com/?q=${address}`;
    };

    const getGoogleMapsURL = () => {
        const address = encodeURIComponent('Rua Ramiro barcelos 1450');
        return `https://www.google.com/maps/search/?api=1&query=${address}`;
    };

    const handleShare = () => {
        const shareData = {
            title: "Resenha dos manos!",
            text: "Confira essa incrível resenha dos manos!",
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
                                Resenha dos manos!
                            </h1>
                            <p className="text-sm mb-4 text-purpleT5">
                                Por: <b>João Davi</b>
                            </p>
                        </div>
                        <div className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                            <h1 className="text-purpleT2 text-center font-bold">
                                <span className="mr-1">R$</span>{price}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-left gap-6 w-full h-fit">
                            <div className="flex-column justify-left text-purple-100 items-center px-2">
                                <h1 className="font-bold">
                                    {'Dia '+date}
                                </h1>
                                <h1>  {'de ' + month} </h1>
                            </div>
                            <div className="flex-column justify-left text-purple-100 items-center px-2">
                                <h1 className="font-bold">
                                    {day}
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
                                        action={() => {/* insert action here */ }}
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
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Lucas Silva'} />
                                    <UserPortrait image={defaultImage} name={'Pedro Oliveira'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Mateus Santos'} />
                                    <UserPortrait image={defaultImage} name={'Rafaela Almeida'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Fernanda Costa'} />
                                    <UserPortrait image={defaultImage} name={'Camila Gonçalves'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Gustavo Pereira'} />
                                    <UserPortrait image={defaultImage} name={'Carolina Souza'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Ricardo Rodrigues'} />
                                    <UserPortrait image={defaultImage} name={'Amanda Oliveira'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Mariana Santos'} />
                                    <UserPortrait image={defaultImage} name={'Guilherme Alves'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Patricia Lima'} />
                                    <UserPortrait image={defaultImage} name={'Daniel Souza'} />
                                </div>
                                <div className="flex justify-center flex-row mb-4 gap-4 h-fit w-full">
                                    <UserPortrait image={defaultImage} name={'Juliana Ferreira'} />
                                    <UserPortrait image={defaultImage} name={'Renato Oliveira'} />
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
            </section>
        </div>
    );
}