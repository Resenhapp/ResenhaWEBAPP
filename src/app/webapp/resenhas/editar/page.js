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

    var initialName = "Resenha de los Manos";
    var initialDate = "20/03/2023";
    var initialHour = "20:00";
    var initialLimit = "80";
    var initialAddress = "Rua ramiro barcelos, 1450";
    var initialDescription = "Vai ter muitos amigos festejando e dançando pra valer venha curtir com a gente na resenha de los manos! realmente vamos botar para quebrar! contaremos com a ilustre presença de Estevan e Bisteca.";

    // TAGS LOGIC    // TAGS LOGIC    // TAGS LOGIC    // TAGS LOGIC    // TAGS LOGIC    // TAGS LOGIC    // TAGS LOGIC
    const [eventTags, setEventTags] = useState([1, 2, 4]);
    const [tempEventTags, setTempEventTags] = useState(eventTags);

    const [allTags, setAllTags] = useState(
        [...tagsData].map((tag) => {
            const isSelected = eventTags.includes(tag.id);
            return { ...tag, selected: isSelected };
        }).sort((a, b) => b.selected - a.selected)
    );

    useEffect(() => {
        setTempEventTags(eventTags);
    }, [eventTags]);

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
                return { ...tag, selected: !tag.selected };
            } else {
                return tag;
            }
        });
        setAllTags(updatedTags);
        if (updatedTags.find(tag => tag.id === tagId).selected) {
            setTempEventTags([...tempEventTags, tagId]);
        } else {
            setTempEventTags(tempEventTags.filter(tagIdTemp => tagIdTemp !== tagId));
        }
    };

    const saveTags = () => {
        setEventTags(tempEventTags);
        toggleEditTagsPageOpen();
    };

    const validEventTags = eventTags.filter(tagId => allTags.some(tag => tag.id === tagId));
    const renderTags = validEventTags.map(tagId => allTags.find(tag => tag.id === tagId));


    // DESCRIPTION LOGIC    // DESCRIPTION LOGIC    // DESCRIPTION LOGIC    // DESCRIPTION LOGIC    // DESCRIPTION LOGIC
    const [description, setDescription] = useState(initialDescription);
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const saveDescription = () => {
        console.log(description);
        toggleEditDescriptionPageOpen();
    };

    // ADDRESS LOGIC    // ADDRESS LOGIC    // ADDRESS LOGIC    // ADDRESS LOGIC    // ADDRESS LOGIC    // ADDRESS LOGIC
    const [address, setAddress] = useState(initialAddress);
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const saveAddress = () => {
        toggleEditAddressPageOpen();
    };

    // DATE LOGIC    // DATE LOGIC    // DATE LOGIC    // DATE LOGIC    // DATE LOGIC    // DATE LOGIC    // DATE LOGIC
    const [date, setDate] = useState(initialDate);
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const saveDate = () => {
        console.log(date);
        toggleEditDatePageOpen(); // close the page after saving
    };

    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC
    const [hour, setHour] = useState(initialHour);
    const handleHourChange = (event) => {
        setHour(event.target.value);
    };
    const saveHour = () => {
        console.log(hour);
        toggleEditHourPageOpen(); // close the page after saving
    };

    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC
    const [limit, setLimit] = useState(initialLimit);
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };
    const saveLimit = () => {
        console.log(limit);
        toggleEditMaxGuestsPageOpen(); // close the page after saving
    };

    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC

    const [name, setName] = useState(initialName);

    // Function to handle changes to the name
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Function to save the name
    const saveName = () => {
        console.log(name); // for now, we're just logging the name, but you can replace this with the actual save logic
        toggleEditNamePageOpen();
    };



    return (
        <div className='flex flex-col w-screen h-screen'>

            {/* TITULO */}
            <EditInfoPage
                isOpen={isEditNamePageOpen}
                pageTitle={'Nome da resenha'}
                togglePage={toggleEditNamePageOpen}
                saveAction={saveName}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Nome da resenha'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O nome da resenha é o que as pessoas verão quando entrarem no seu convite, então ele deve ser objetivo e simples, algo que traduza o que vai ser sua resenha.
                    </p>
                </div>
            </EditInfoPage>

            {/* DATA */}
            <EditInfoPage
                isOpen={isEditDatePageOpen}
                pageTitle={'Data da resenha'}
                togglePage={toggleEditDatePageOpen}
                saveAction={saveDate}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='20/03/2023'
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="w-full flex flex-row justify-end">
                    <button className="py-1 px-6 text-purpleT3 bg-whiteT1 rounded-full">
                        Abrir calendário
                    </button>
                </div>
                <div>
                    <p className='text-sm'>
                        A data da resenha é a informação que as pessoas verão quando acessarem o seu convite para saberem quando que sua resenha vai acontecer.
                    </p>
                </div>
            </EditInfoPage>

            {/* HORARIO */}
            <EditInfoPage
                isOpen={isEditHourPageOpen}
                pageTitle={'Horário da resenha'}
                togglePage={toggleEditHourPageOpen}
                saveAction={saveHour}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='20:00'
                        value={hour}
                        onChange={handleHourChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        A hora da resenha é a informação que as pessoas verão quando acessarem o seu convite para saberem exatamente a que horas sua resenha vai começar.
                    </p>
                </div>
            </EditInfoPage>

            {/* LIMITE */}
            <EditInfoPage
                isOpen={isEditMaxGuestsPageOpen}
                pageTitle={'Limite de convidados'}
                togglePage={toggleEditMaxGuestsPageOpen}
                saveAction={saveLimit}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='80'
                        value={limit}
                        onChange={handleLimitChange}
                    />
                </div>
                <div>
                    <p className='text-sm'>
                        O limite de convidados é o número máximo de pessoas que você pode receber em sua resenha. Este é o número que os convidados verão ao acessar o seu convite, o que os ajudará a entender a escala e a exclusividade do evento.
                    </p>
                </div>
            </EditInfoPage>

            {/* ENDERECO */}
            <EditInfoPage isOpen={isEditAddressPageOpen} pageTitle={'Endereço da resenha'} saveAction={saveAddress} togglePage={toggleEditAddressPageOpen}>
                <div className='w-full'>
                    <input
                        value={address}
                        onChange={handleAddressChange}
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
            <EditInfoPage isOpen={isEditDescriptionPageOpen} saveAction={saveDescription} pageTitle={'Descrição da resenha'} togglePage={toggleEditDescriptionPageOpen}>
                <div className='w-full'>
                    <textarea
                        rows="4"
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='Descrição da resenha'
                        value={description}  // O valor do textarea agora é controlado pelo estado 'description'
                        onChange={handleDescriptionChange}  // Atualiza o estado 'description' toda vez que o usuário altera o conteúdo do textarea
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
            <EditInfoPage isOpen={isEditTagsPageOpen} pageTitle={'Tags da resenha'} saveAction={saveTags} togglePage={toggleEditTagsPageOpen}>
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
                            <div className="flex flex-row justify-between items-center w-full max-w-screen-xs">
                                <button
                                    onClick={toggleEditNamePageOpen}
                                    className="flex items-center justify-start text-xl font-bold text-whiteT1 overflow-hidden whitespace-nowrap overflow-ellipsis mr-2"
                                    style={{ maxWidth: "calc(100% - 100px)" }} // Subtraia o espaço necessário para o componente de preço 
                                >
                                    {name}
                                    <Vector vectorname={'edit02'} />
                                </button>
                                <div className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                                    <p className="text-purpleT2 text-center font-bold">
                                        <span className="mr-1">R$</span>15
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <button onClick={toggleEditDatePageOpen} className="bg-purpleT2 w-fit h-fit p-1 rounded-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>20</p>
                                        <Vector vectorname={'edit02'} />
                                    </div>
                                    <p>de maio</p>
                                </button>
                                <div className="">
                                    <p>Sábado</p>
                                    <button onClick={toggleEditHourPageOpen} className="bg-purpleT2 rounded-lg w-fit h-fit p-1 flex flex-row gap-2 items-center">
                                        <p>às 20:00h</p>
                                        <Vector vectorname={'edit02'} />
                                    </button>
                                </div>
                                <button onClick={toggleEditMaxGuestsPageOpen} className="bg-purpleT2 flex flex-col w-fit h-fit p-1 rounded-lg">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Limite máximo</p>
                                        <Vector vectorname={'edit02'} />
                                    </div>
                                    <p>10/80</p>
                                </button>
                            </div>
                            <button onClick={toggleEditAddressPageOpen} className="bg-purpleT2 flex flex-col w-full h-fit p-2 rounded-lg">
                                <div className="flex flex-row gap-2 items-center">
                                    <p>Endereço</p>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p className="text-left">{address}</p>
                            </button>
                            <button onClick={toggleEditDescriptionPageOpen} className="bg-purpleT2 flex flex-col w-full h-fit p-2 rounded-lg">
                                <div className="flex flex-row gap-2 items-center">
                                    <p>Descrição</p>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p className="text-left">{description}</p>
                            </button>
                            <div onClick={(e) => {
                                e.stopPropagation();
                                toggleEditTagsPageOpen();
                            }}
                                className="bg-purpleT2 flex flex-col w-full h-fit p-2 gap-2 rounded-lg"
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    <p>Tags</p>
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