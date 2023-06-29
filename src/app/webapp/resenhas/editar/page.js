'use client'
import PageHeader from "@/src/components/PageHeader"
import Image from "next/image"
import Vector from "@/src/components/Vector"
import EditInfoPage from "@/src/components/EditInfoPage"
import React, { useState, useEffect } from 'react';
import Tag from "@/src/components/Tag"
import { getInterest } from "@/src/components/interestsData"
import { tagsData } from "@/src/components/tagsData"

export default function EditEvent() {

    const [isEditNamePageOpen, setIsEditNamePageOpen] = useState(false);
    const toggleEditNamePageOpen = () => {
        setIsEditNamePageOpen(!isEditNamePageOpen);
    };

    const [isEditDatePageOpen, setIsEditDatePageOpen] = useState(false);
    const toggleEditDatePageOpen = () => {
        setIsEditDatePageOpen(!isEditDatePageOpen);
    };

    const [isEditHourPageOpen, setIsEditHourPageOpen] = useState(false);
    const toggleEditHourPageOpen = () => {
        setIsEditHourPageOpen(!isEditHourPageOpen);
    };

    const [isEditMaxGuestsPageOpen, setIsEditMaxGuestsPageOpen] = useState(false);
    const toggleEditMaxGuestsPageOpen = () => {
        setIsEditMaxGuestsPageOpen(!isEditMaxGuestsPageOpen);
    };

    const [isEditAddressPageOpen, setIsEditAddressPageOpen] = useState(false);
    const toggleEditAddressPageOpen = () => {
        setIsEditAddressPageOpen(!isEditAddressPageOpen);
    };

    const [isEditDescriptionPageOpen, setIsEditDescriptionPageOpen] = useState(false);
    const toggleEditDescriptionPageOpen = () => {
        setIsEditDescriptionPageOpen(!isEditDescriptionPageOpen);
    };

    const [isEditTagsPageOpen, setIsEditTagsPageOpen] = useState(false);
    const toggleEditTagsPageOpen = () => {
        setIsEditTagsPageOpen(!isEditTagsPageOpen);
    };


    var date = "X";
    var hour = "X";
    var max = "X";
    var address = "X";
    var description = "X";

    // Initial tag IDs
    const [eventTags, setEventTags] = useState([1, 2, 4]);
    const [tempEventTags, setTempEventTags] = useState(eventTags);

    // Initialize allTags
    const [allTags, setAllTags] = useState(
        [...tagsData].map((tag) => {
            const isSelected = eventTags.includes(tag.id);
            return { ...tag, selected: isSelected };
        }).sort((a, b) => b.selected - a.selected)
    );

    useEffect(() => {
        setTempEventTags(eventTags);
    }, [eventTags]);

    // Update allTags based on tempEventTags
    useEffect(() => {
        setAllTags(
            [...tagsData].map((tag) => {
                const isSelected = tempEventTags.includes(tag.id);
                return { ...tag, selected: isSelected };
            }).sort((a, b) => b.selected - a.selected)
        );
    }, [tempEventTags]);

    const handleTagClick = (tagId) => {
        let updatedTags = allTags.map((tag) => {
            if (tag.id === tagId) {
                // Toggle the "selected" state
                return { ...tag, selected: !tag.selected };
            } else {
                return tag;
            }
        });
    
        setAllTags(updatedTags);
    
        if (updatedTags.find(tag => tag.id === tagId).selected) {
            setTempEventTags([...tempEventTags, tagId]); // Add the tagId
        } else {
            setTempEventTags(tempEventTags.filter(tagIdTemp => tagIdTemp !== tagId)); // Remove the tagId
        }
    };
    

    const saveAction = () => {
        setEventTags(tempEventTags);
        toggleEditTagsPageOpen(); // Call the function here
    };

    const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
    const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));

    return (
        <div className='flex flex-col w-screen h-screen'>

            {/* TITULO */}
            <EditInfoPage isOpen={isEditNamePageOpen} pageTitle={'Nome da resenha'} togglePage={toggleEditNamePageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome da resenha'
                    ></input>
                </div>
                <div>
                    <p className='text-sm'>
                        O nome da resenha é o que as pessoas verão quando entrarem no seu convite, então ele deve ser objetivo e simples, algo que traduza o que vai ser sua resenha.
                    </p>
                </div>
            </EditInfoPage>

            {/* DATA */}
            <EditInfoPage isOpen={isEditDatePageOpen} pageTitle={'Data da resenha'} togglePage={toggleEditDatePageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='20/03/2023'
                    ></input>
                    <p className="text-sm text-purpleT4">20 de março de 2023</p>
                </div>
                <div>
                    <p className='text-sm'>
                        A data da resenha é a informação que as pessoas verão quando acessarem o seu convite para saberem quando que sua resenha vai acontecer.
                    </p>
                </div>
            </EditInfoPage>

            {/* HORARIO */}
            <EditInfoPage isOpen={isEditHourPageOpen} pageTitle={'Horário da resenha'} togglePage={toggleEditHourPageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='20:00'
                    ></input>
                </div>
                <div>
                    <p className='text-sm'>
                        A hora da resenha é a informação que as pessoas verão quando acessarem o seu convite para saberem exatamente a que horas sua resenha vai começar.
                    </p>
                </div>
            </EditInfoPage>

            {/* LIMITE */}
            <EditInfoPage isOpen={isEditMaxGuestsPageOpen} pageTitle={'Limite de convidados'} togglePage={toggleEditMaxGuestsPageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='80'
                    ></input>
                </div>
                <div>
                    <p className='text-sm'>
                        O limite de convidados é o número máximo de pessoas que você pode receber em sua resenha. Este é o número que os convidados verão ao acessar o seu convite, o que os ajudará a entender a escala e a exclusividade do evento.
                    </p>
                </div>
            </EditInfoPage>

            {/* ENDERECO */}
            <EditInfoPage isOpen={isEditAddressPageOpen} pageTitle={'Endereço da resenha'} togglePage={toggleEditAddressPageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Rua ramiro barcelos, 1450'
                    ></input>
                </div>
                <div className="w-full flex flex-row justify-end">
                    <button className="py-1 px-6 text-purpleT3 bg-whiteT1 rounded-full">
                        Ver no mapa
                    </button>
                </div>
                <div>
                    <p className='text-sm'>
                        O endereço da resenha é uma informação crucial que seus convidados verão quando acessarem o convite. É importante que esteja completo e correto para que os convidados possam encontrar o local do evento com facilidade. Lembre-se de incluir detalhes como o número do prédio, o nome da rua e qualquer ponto de referência útil.
                    </p>
                </div>
            </EditInfoPage>

            {/* DESCRICAO */}
            <EditInfoPage isOpen={isEditDescriptionPageOpen} pageTitle={'Descrição da resenha'} togglePage={toggleEditDescriptionPageOpen}>
                <div className='w-full'>
                    <textarea
                        rows="4"
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Descrição da resenha'
                    ></textarea>
                </div>
                <div>
                    <p className='text-sm'>
                        A descrição da resenha é a oportunidade de fornecer detalhes adicionais sobre o seu evento.
                        Os convidados verão estas informações quando acessarem o convite, portanto, deve ser um texto claro e atrativo, que dê uma ideia do que eles podem esperar da resenha.
                    </p>
                </div>
            </EditInfoPage>

            {/* TAGS */}

            <EditInfoPage isOpen={isEditTagsPageOpen} pageTitle={'Tags da resenha'} saveAction={saveAction} togglePage={toggleEditTagsPageOpen}>
                <div className='w-full'>
                    <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
                        {[...allTags].sort((a, b) => b.selected - a.selected).map((tag) => (
                            <Tag
                                key={tag.id}
                                tagname={tag.name}
                                type={tag.type}
                                colorName={tag.colorName}
                                highlightColor={tag.highlightColor}
                                isEditable={true}
                                onClick={() => handleTagClick(tag.id)}
                                selected={tag.selected}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <p className='text-sm'>
                        As tags da resenha são palavras-chave que você pode incluir para ajudar a descrever e categorizar o seu evento. Elas serão visíveis aos convidados quando acessarem o convite e podem ajudar a dar uma ideia rápida do que esperar da resenha. Escolha tags que representem bem o tema, o estilo ou a vibe da sua resenha.
                    </p>
                </div>
            </EditInfoPage>


            <PageHeader pageTitle={'Editar resenha'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col items-center justify-start h-screen px-4">
                <section className="flex flex-col items-center w-full max-w-md p-4">
                    <div class="bg-scroll flex flex-col gap-4 h-[70vh] w-full overflow-y-auto">
                        <div className="relative w-full">
                            <Image
                                src="https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png"
                                alt=""
                                layout="responsive"
                                width={400}
                                height={270}
                                className="object-cover w-full h-[48px]"
                            />
                            <div className="absolute inset-0">
                                <div className="absolute bottom-0 bg-gradient-to-t from-purpleT1 opacity-100 w-full h-2/5" />
                            </div>
                        </div>
                        <div className="w-full gap-2 flex flex-col">
                            <div className="w-full flex flex-row justify-between max-w-screen-xs items-center">
                                <div className="w-fit">
                                    <button onClick={toggleEditNamePageOpen} className="flex flex-row items-center">
                                        <h1 className="text-xl font-bold mr-2 text-whiteT1">
                                            Resenha de los Manos
                                        </h1>
                                        <Vector vectorname={'edit02'} />
                                    </button>
                                </div>
                                <div className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                                    <h1 className="text-purpleT2 text-center font-bold">
                                        <span className="mr-1">R$</span>15
                                    </h1>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <button onClick={toggleEditDatePageOpen} className="bg-purpleT2 w-fit h-fit p-1 rounded-lg">
                                    <div className="flex flex-row gap-1 items-center">
                                        <h1>20</h1>
                                        <Vector vectorname={'edit02'} />
                                    </div>
                                    <h1>de maio</h1>
                                </button>
                                <div className="">
                                    <h1>Sábado</h1>
                                    <button onClick={toggleEditHourPageOpen} className="bg-purpleT2 rounded-lg w-fit h-fit p-1 flex flex-row gap-1 items-center">
                                        <h1>às 20:00h</h1>
                                        <Vector vectorname={'edit02'} />
                                    </button>
                                </div>
                                <button onClick={toggleEditMaxGuestsPageOpen} className="bg-purpleT2 flex flex-col w-fit h-fit p-1 rounded-lg">
                                    <div className="flex flex-row gap-1 items-center">
                                        <h1>Limite máximo</h1>
                                        <Vector vectorname={'edit02'} />
                                    </div>
                                    <h1>10/80</h1>
                                </button>
                            </div>
                            <button onClick={toggleEditAddressPageOpen} className="bg-purpleT2 w-fit h-fit p-1 rounded-lg">
                                <div className="flex flex-row gap-1 items-center">
                                    <h1>Endereço</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <h1>Rua Ramiro barcelos 1450</h1>
                            </button>
                            <button onClick={toggleEditDescriptionPageOpen} className="bg-purpleT2 flex flex-col w-fit h-fit p-1 rounded-lg">
                                <div className="flex flex-row gap-1 items-center">
                                    <h1>Descrição</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p className="text-left">Vai ter bebida liberada + terraço + engov 🔥 e também muito aaaaaaaaa</p>
                            </button>
                            <div onClick={(e) => {
                                e.stopPropagation();
                                toggleEditTagsPageOpen();
                            }}
                                className="bg-purpleT2 flex flex-col w-full h-fit p-1 rounded-lg"
                            >
                                <div className="flex flex-row gap-1 items-center">
                                    <h1>Tags</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {renderTags.map((tag) => (
                                        <Tag
                                            key={tag.id}
                                            tagname={tag.name}
                                            type={tag.type}
                                            colorName={tag.colorName}
                                            highlightColor={tag.highlightColor}
                                            isEditable={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}