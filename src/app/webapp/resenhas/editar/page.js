'use client'
import Button from "@/src/components/Button"
import Image from "next/image"
import Vector from "@/src/components/Vector"
import EditInfoPage from "@/src/components/EditInfoPage"
import React, { useState, useEffect } from 'react';
import Tag from "@/src/components/Tag"
import { tagsData } from "@/src/components/tagsData"
import Toggle from "@/src/components/Toggle"

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

    const [isEditPricePageOpen, setIsEditPricePageOpen] = useState(false);
    const toggleEditPricePageOpen = () => {
        setIsEditPricePageOpen(!isEditPricePageOpen);
    };

    var initialName = "Resenha de los Manos";
    var initialDate = "20/03/2023";
    var initialHour = "20:00";
    var initialFinalHour = "20:00";
    var initialLimit = "80";
    var initialVipLimit = "0";
    var initialAddress = "Rua ramiro barcelos, 1450";
    var initialDescription = "Vai ter muitos amigos festejando e dançando pra valer venha curtir com a gente na resenha de los manos! realmente vamos botar para quebrar! contaremos com a ilustre presença de Estevan e Bisteca.";
    var initialPrice = "R$ 20,00";
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
        let input = event.target.value.replace(/\D/g, "");
        input = input.replace(/(\d{2})(\d)/, "$1/$2");
        input = input.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
        input = input.replace(/(\d{2})\/(\d{2})\/(\d{4}).*/, "$1/$2/$3");
        setDate(input);
    };

    const saveDate = () => {
        const [day, month, year] = date.split('/').map(Number);
        const currentYear = new Date().getFullYear();

        let maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
            maxDaysInMonth[1] = 29;
        }

        if (year < currentYear) {
            setDateError('O ano inserido é inválido. Por favor, insira um ano atual ou futuro.');
        } else if (month < 1 || month > 12) {
            setDateError('O mês inserido é inválido. Por favor, insira um mês entre 01 e 12.');
        } else if (day < 1 || day > maxDaysInMonth[month - 1]) {
            setDateError('O dia inserido é inválido. Por favor, insira um dia entre 01 e ' + maxDaysInMonth[month - 1] + '.');
        } else {
            setDateError('');
            console.log(date);
            toggleEditDatePageOpen();
        }
    };

    const formatDate = (dateString) => {
        const months = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
        const parts = dateString.split("/");
        const day = parts[0];
        const month = months[parseInt(parts[1]) - 1];

        return { day, month };
    }

    const [dateError, setDateError] = useState('');
    const { day, month } = formatDate(date);

    const getDayOfWeek = (dateString) => {
        const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const parts = dateString.split("/");
        const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
        const dayOfWeek = days[dateObject.getDay()];

        return dayOfWeek;
    }

    const dayOfWeek = getDayOfWeek(date);

    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC    // HOUR LOGIC
    const [isEndTime, setIsEndTime] = useState(false);

    const handleToggle = () => {
        setIsEndTime(!isEndTime);
    };

    const [startHour, setStartHour] = useState(initialHour);
    const handleStartHourChange = (event) => {
        let inputHour = event.target.value;

        inputHour = inputHour.replace(/\D/g, '');

        if (inputHour.length >= 2) {
            inputHour = inputHour.substring(0, inputHour.length - 2) + ':' + inputHour.substring(inputHour.length - 2, inputHour.length);
        }

        setStartHour(inputHour);
    };

    const [endHour, setEndHour] = useState(initialFinalHour);
    const handleEndHourChange = (event) => {
        let inputHour = event.target.value;

        inputHour = inputHour.replace(/\D/g, '');

        if (inputHour.length >= 2) {
            inputHour = inputHour.substring(0, inputHour.length - 2) + ':' + inputHour.substring(inputHour.length - 2, inputHour.length);
        }

        setEndHour(inputHour);
    };

    const saveHour = () => {
        console.log(startHour);
        console.log(endHour);
        toggleEditHourPageOpen();
    };



    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC    // LIMIT LOGIC
    const [limit, setLimit] = useState(initialLimit);
    const [isVip, setIsVip] = useState(false);
    const [vipLimit, setVipLimit] = useState(initialVipLimit);
    const [limitError, setLimitError] = useState('');

    useEffect(() => {
        if (!isVip) {
          setVipLimit(0);
        }
      }, [isVip]);


    const handleToggleVip = () => {
        setIsVip(!isVip);
    };

    const handleLimitChange = (event) => {
        const onlyNumbers = event.target.value.replace(/\D/g, '');
        setLimit(onlyNumbers);
    };

    const handleVipLimitChange = (event) => {
        const onlyNumbers = event.target.value.replace(/\D/g, '');
        setVipLimit(onlyNumbers);
    };

    const saveLimit = () => {
        if (limit <= 0) {
            setLimitError('O número de vagas normais deve ser maior que zero.');
            return;
        }
        if (isVip && vipLimit <= 0) {
            setLimitError('O número de vagas VIP deve ser maior que zero quando o modo VIP está ativado.');
            return;
        }
        
        setLimitError('');
        console.log(limit);
        console.log(vipLimit);
        toggleEditMaxGuestsPageOpen();
    };


    // IMAGE LOGIC    // IMAGE LOGIC    // IMAGE LOGIC    // IMAGE LOGIC    // IMAGE LOGIC    // IMAGE LOGIC    // IMAGE LOGIC
    var currentImage = 'https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png';
    const [image, setImage] = useState(currentImage);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImage(null);
    };


    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC

    const [name, setName] = useState(initialName);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const saveName = () => {
        console.log(name);
        toggleEditNamePageOpen();
    };

    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC    // PRICE LOGIC

    const [price, setPrice] = useState(initialPrice);

    const handlePriceChange = (event) => {
        const onlyNumbers = event.target.value.replace(/\D/g, "");
        const formattedPrice = (parseInt(onlyNumbers) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });

        setPrice(formattedPrice);
    };

    const savePrice = () => {
        console.log(price);
        toggleEditPricePageOpen();
    };

    return (
        <div className="bg-purpleT1 h-screen min-h-fit">

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
                saveAction={saveDate}
            >
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='20/03/2023'
                        value={date}
                        onChange={handleDateChange}
                        type="tel"
                    />
                </div>
                <div className="w-full flex flex-row justify-start">

                </div>
                <div>
                    {dateError && <div className='text-red-500'>{dateError}</div>} {/* Error message div */}
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
                    <p>Hora de início</p>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='hora de início'
                        value={startHour}
                        onChange={handleStartHourChange}
                        maxLength={5}
                        type="tel"
                    />
                </div>
                {isEndTime && <div className='w-full'>
                    <p>Hora de fim</p>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='hora de fim'
                        value={endHour}
                        onChange={handleEndHourChange}
                        maxLength={5}
                        type="tel"
                    />
                </div>}
                <Toggle labelText={'Hora pra acabar'} showLabel={true} showQuestion={true} onToggle={handleToggle} startToggled={isEndTime} />
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
                    <p>Vagas Gerais</p>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='máximo de convidados'
                        value={limit}
                        onChange={handleLimitChange}
                        type="tel"
                    />
                </div>
                {isVip && <div className='w-full'>
                    <p>Vagas VIP</p>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='máximo de vagas VIP'
                        value={vipLimit}
                        onChange={handleVipLimitChange}
                        type="tel"
                    />
                </div>}
                <Toggle labelText={'Vagas VIP'} showLabel={true} showQuestion={true} onToggle={handleToggleVip} startToggled={isVip} />
                <div>
                {limitError && <div className='text-red-500'>{limitError}</div>} {/* Error message div */}
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
                <div className="w-full flex flex-row justify-start">
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
                                ringColor={tag.ringColor}
                                ringThickness={tag.ringThickness}
                                weight={tag.weight}
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
            {/* PREÇO */}
            <EditInfoPage
                isOpen={isEditPricePageOpen}
                pageTitle={'Preço do Evento'}
                saveAction={savePrice}
                togglePage={toggleEditPricePageOpen}>
                <div className='w-full'>
                    <input
                        className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                        placeholder='R$00.00'
                        value={price}
                        onChange={handlePriceChange}
                        type="tel"
                    />
                </div>

                <div>
                    <Toggle labelText={'Pagamento com PIX'} showLabel={true} startToggled={true} showQuestion={true} />
                    <Toggle labelText={'Pagamento com cartão'} showLabel={true} startToggled={true} showQuestion={true} />
                    <Toggle labelText={'Pagamento com dinheiro'} showLabel={true} startToggled={true} showQuestion={true} />
                </div>
                <div>
                    <p className='text-sm'>
                        O preço do evento é a informação que as pessoas verão quando acessarem o seu convite para saberem quanto custará para participar do evento. Defina um preço que esteja de acordo com o que será oferecido no evento.
                    </p>
                </div>
            </EditInfoPage>

            <div className="flex flex-col items-center justify-start h-fit bg-purpleT1">
                <section className="flex flex-col items-center w-full max-w-md">

                    <div className="relative w-full">
                        {!image && (
                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                <input
                                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 100 }}
                                    type="file"
                                    accept=".gif, .png, .jpg, .jpeg"
                                    onChange={handleImageChange}
                                />
                                <div className='flex flex-col gap-2 justify-center items-center content-center'>
                                    <h1 className='text-center text-sm px-3'>Toque aqui para escolher uma imagem</h1>
                                </div>
                            </label>
                        )}
                        {image && (
                            <>
                                <Image
                                    src={image}
                                    alt="Selected Image"
                                    width={400}
                                    height={270}
                                    className="object-cover w-full h-[260px]"
                                />
                                <label className="absolute inset-0 flex items-center z-[5] justify-center cursor-pointer">
                                    <input
                                        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0 }}
                                        type="file"
                                        accept=".gif, .png, .jpg, .jpeg"
                                        onChange={handleImageChange}
                                    />
                                    <div className="bg-purpleT1 p-3 rounded-full ring-1 ring-whiteT1">
                                        <Vector vectorname={"edit02"} />
                                    </div>
                                </label>
                            </>
                        )}
                        <div className="absolute inset-0">
                            <div className="absolute bottom-[-1px] bg-gradient-to-t from-purpleT1 opacity-100 w-full h-2/5" />
                        </div>
                    </div>

                    
                    <div className="w-full gap-2 flex flex-col p-5">
                        <div className="flex flex-row justify-between items-center w-full max-w-screen-xs">
                            <div
                                onClick={toggleEditNamePageOpen}
                                className="flex items-start justify-start text-left w-full text-xl font-bold text-whiteT1 gap-2"
                            >
                                {name}
                                <div className="my-2">
                                    <Vector vectorname={'edit02'} />
                                </div>
                            </div>
                            <div onClick={(e) => {
                                e.stopPropagation();
                                toggleEditPricePageOpen();
                            }} className="p-2 bg-whiteT1 flex justify-center items-center rounded-full px-4">
                                <p className="text-purpleT2 text-center font-bold">
                                    <span className="flex flex-row items-center gap-1" style={{ whiteSpace: "nowrap" }}>{price}<Vector vectorname={"edit03"} /></span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-around gap-2">
                            <button onClick={toggleEditDatePageOpen} className="bg-transparent ring-1 ring-inset ring-whiteT1 w-fit h-fit p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="font-bold">{dayOfWeek}</p>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p>{day} de {month}</p>
                            </button>
                            <div onClick={toggleEditHourPageOpen} className="bg-transparent ring-1 ring-inset min-w-fit ring-whiteT1 rounded-2xl h-fit p-2 flex flex-row gap-2 w-full items-center">
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center gap-2">
                                        <p className="font-bold">Horário</p><Vector vectorname={'edit02'} />
                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <p className="text-left flex flex-row gap-1">
                                            {startHour.endsWith(":00") ? `${startHour.slice(0, -3)}h` : startHour}
                                        </p>
                                        {isEndTime &&
                                            <p className="text-left flex flex-row">
                                                até {endHour.endsWith(":00") ? `${endHour.slice(0, -3)}h` : endHour}
                                            </p>}
                                    </div>
                                </div>
                            </div>
                            <button onClick={toggleEditMaxGuestsPageOpen} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="font-bold">Limite</p>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p>10/{parseInt(limit) + parseInt(vipLimit)}</p>
                            </button>
                        </div>
                        <button onClick={toggleEditAddressPageOpen} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 rounded-2xl">
                            <div className="flex flex-row gap-2 items-center">
                                <p>Endereço</p>
                                <Vector vectorname={'edit02'} />
                            </div>
                            <p className="text-left">{address}</p>
                        </button>
                        <button onClick={toggleEditDescriptionPageOpen} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 rounded-2xl">
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
                            className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 gap-2 rounded-2xl"
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
                                        ringThickness={tag.ringThickness}
                                        ringColor={tag.ringColor}
                                        weight={tag.weight}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row justify-around w-full">
                            <button className="py-4 w-2/3 px-8">Voltar</button>
                            <Button label={'Salvar'} icon={'check'} action={() => handleNavigation('perfil')} iconSide='right' height={1} width={1} textAlign='center' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}