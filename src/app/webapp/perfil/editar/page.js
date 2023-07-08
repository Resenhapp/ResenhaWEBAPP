'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import UserProfileEditor from '@/src/components/UserProfileEditor';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';
import Button from '@/src/components/Button';
import ModalButton from '@/src/components/ModalButton';
import EditInfoPage from '@/src/components/EditInfoPage';
import Tag from '@/src/components/Tag';
import { interestsData } from '@/src/components/interestsData';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import { te } from 'date-fns/locale';

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function EditProfile() {
    var u = Cookies.get('username');
    var validator = Cookies.get('validator');

    const [checkerCallback, setCheckerCallback] = useState(null);
    const [newProfile, setNewProfile] = useState(null);

    const [hasChange, setHasChange] = useState(false);

    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
    const [isEditInterestsPageOpen, setIsEditInterestsPageOpen] = useState(false);

    var [interests, setInterests] = useState([]);
    var [tempInterests, setTempInterests] = useState(interests);

    var [name, setName] = useState(name);
    var [tempName, setTempName] = useState(name);

    var [username, setUsername] = useState(username);
    var [tempUsername, setTempUsername] = useState(username);
    
    var [isEditUsernamePageOpen, setIsEditUsernamePageOpen] = useState(false);

    var [isEditAboutPageOpen, setIsEditAboutPageOpen] = useState(false);
    var [about, setAbout] = useState('');
    var [tempAbout, setTempAbout] = useState(about);

    const [data, setData] = useState(null);

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
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'getUserData',
                username: u,
                validator: validator
            });
            setData(response);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const [allInterests, setAllInterests] = useState(
        [...interestsData].map((interest) => {
            const isSelected = interests.includes(interest.id);
            return { ...interest, selected: isSelected };
        }).sort((a, b) => b.selected - a.selected)
    );

    const toggleEditInterestsPageOpen = () => {
        if (isEditInterestsPageOpen) {
            setTempInterests(interests);
        }
        setIsEditInterestsPageOpen(!isEditInterestsPageOpen);
    };

    const handleInterestClick = (interestId) => {
        setTempInterests(
            tempInterests.includes(interestId)
            ? tempInterests.filter(id => id !== interestId)
            : [...tempInterests, interestId]
        );
    };

    const saveInterests = () => {
        setInterests(tempInterests);
        toggleEditInterestsPageOpen();
        setHasChange(true);
    };

    const validUserInterests = interests.filter(interestId => allInterests.some(interest => interest.id === interestId));
    const renderInterests = validUserInterests.map(interestId => allInterests.find(interest => interest.id === interestId));
    
    const toggleEditUsernamePageOpen = () => {
        if (isEditUsernamePageOpen) {
            setTempName(name);
            setTempUsername(username);
        }
        setIsEditUsernamePageOpen(!isEditUsernamePageOpen);
    };

    const handleUsernameChange = (event) => {
        setTempName(event.target.value);
    };

    const handleHandleChange = (event) => {
        setTempUsername(event.target.value);
    };

    const saveUsernameAndHandle = () => {
        setName(tempName);
        setUsername(tempUsername);
        toggleEditUsernamePageOpen();
        setHasChange(true);
    };

    const toggleEditAboutPageOpen = () => {
        setIsEditAboutPageOpen(!isEditAboutPageOpen);
    };

    const handleAboutChange = (event) => {
        setTempAbout(event.target.value);
    };

    const saveAbout = () => {
        setAbout(tempAbout);
        toggleEditAboutPageOpen();
        setHasChange(true);
    };

    useEffect(() => {
        setTempInterests(interests);
    }, [interests]);

    useEffect(() => {
        setTempAbout(about);
    }, [about]);

    useEffect(() => {
        if (!isEditAboutPageOpen) {
            setTempAbout(about);
        }
    }, [isEditAboutPageOpen]);

    useEffect(() => {
        setTempName(name);
        setTempUsername(username);
    }, [name, username]);

    useEffect(() => {
        setAllInterests(
            [...interestsData].map((interest) => {
                const isSelected = tempInterests.includes(interest.id);
                return { ...interest, selected: isSelected };
            }).sort((a, b) => b.selected - a.selected)
        );
    }, [tempInterests]);

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading/>
            </div>
        );
    }

    var { name, username, about, followers, following, events, interests, comments, verified, hash, mine, partiesWent } = data

    var interests = JSON.parse(interests).interests;

    interestsData.filter(interest => interests.includes(interest.id))

    return (
        <div>
            <div className='flex flex-col w-screen h-screen'>
                <PageHeader
                    pageTitle={'Editar perfil'}
                    isBack={true}
                    checker={() => {null}}
                    userData={data}
                />
                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <section className="flex flex-col gap-4 h-full items-center w-full max-w-md p-4">
                        <EditInfoPage isOpen={isEditInterestsPageOpen} pageTitle={'Seus interesses'} saveAction={saveInterests} togglePage={toggleEditInterestsPageOpen}>
                            <div className='w-full'>
                                <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
                                    {[...allInterests].sort((a, b) => b.selected - a.selected).map((interest) => (
                                        <Tag
                                            key={interest.id}
                                            tagname={interest.name}
                                            type={interest.type}
                                            colorName={interest.colorName}
                                            highlightColor={interest.highlightColor}
                                            isEditable={true}
                                            onClick={() => handleInterestClick(interest.id)}
                                            selected={interest.selected}
                                            ringColor={interest.ringColor}
                                            ringThickness={interest.ringThickness}
                                            weight={interest.weight}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    Os interesses do usuário são palavras-chave que você pode incluir para ajudar a descrever e categorizar suas preferências. Eles serão visíveis a outros usuários ao visitarem seu perfil e podem ajudar a dar uma ideia rápida do que você gosta. Escolha interesses que representem bem suas preferências e estilo.
                                </p>
                            </div>
                        </EditInfoPage>
                        <EditInfoPage isOpen={isEditUsernamePageOpen} pageTitle={'Nome e @utilizador'} saveAction={saveUsernameAndHandle} togglePage={toggleEditUsernamePageOpen}>
                            <div className='w-full'>
                                <label className='font-bold'>Nome:</label>
                                <input
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 '
                                    placeholder='Nome de usuário'
                                    value={tempName}
                                    onChange={handleUsernameChange}
                                />
                                <label className='font-bold'>Nome de usuário:</label>
                                <input
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 '
                                    placeholder='@'
                                    value={tempUsername}
                                    onChange={handleHandleChange}
                                />
                            </div>
                            <p className='text-sm'>
                                Seu nome e nome de usuário são identificações importantes. O nome pode ser livremente escolhido e o nome de usuário é único, permitindo que outros usuários possam mencionar ou buscar você na plataforma. Escolha um que represente sua identidade.
                            </p>
                        </EditInfoPage>
                        <EditInfoPage isOpen={isEditAboutPageOpen} saveAction={saveAbout} pageTitle={'Sobre você'} togglePage={toggleEditAboutPageOpen}>
                            <div className='w-full'>
                                <textarea
                                    rows="4"
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 font-bold'
                                    placeholder='Fale sobre você'
                                    value={tempAbout}
                                    onChange={handleAboutChange}
                                ></textarea>
                            </div>
                            <div>
                                <p className='text-sm'>
                                    Falar sobre você é uma grande oportunidade para se apresentar aos outros usuários.
                                    Essas informações serão visíveis no seu perfil, portanto, escreva de forma clara e atrativa, mostrando o que as pessoas podem esperar ao interagir com você.
                                </p>
                            </div>
                        </EditInfoPage>
                        <div className='w-full flex justify-center'>
                            <UserProfileEditor
                                currentProfile={`https://media.resenha.app/u/${hash}.png`}
                                newProfile={newProfile}
                                onChange={newImage => {
                                    setNewProfile(newImage);
                                    setHasChange(true);
                                    console.log("New image selected: ", newImage);
                                }}
                            />
                        </div>
                        <div className='w-full flex flex-col items-center'>
                            <div onClick={toggleEditUsernamePageOpen} className='flex flex-row items-center gap-2 w-fit bg-purpleT ring-1 ring-inset ring-whiteT1 px-2 py-1 rounded-xl'>
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-row items-center justify-center content-center gap-1'>
                                        <h1 className='font-bold text-2xl'>{name}</h1>{verified == true && <Vector vectorname={'verified02'} />}
                                    </div>
                                    <h3 className='font-normal text-sm'>@{username}</h3>
                                </div>
                                <div className='right-0 top-0 rounded-full'>
                                    <Vector vectorname={'edit02'} />
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-fit'>
                            <div onClick={toggleEditAboutPageOpen} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 rounded-2xl">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className='font-bold text-lg'>Sobre</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <p className="text-left h-fit" style={{ whiteSpace: "normal", overflowWrap: "break-word" }}>{about}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div onClick={(e) => { e.stopPropagation(); toggleEditInterestsPageOpen(); }} className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 gap-2 rounded-2xl">
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className='font-bold text-lg'>Interesses</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {interestsData.filter(interest => interests.includes(interest.id)).map(interest => (
                                        <Tag
                                            key={interest.id}
                                            tagname={interest.name}
                                            type={interest.type}
                                            colorName={interest.colorName}
                                            highlightColor={interest.highlightColor}
                                            isEditable={false}
                                            ringThickness={interest.ringThickness}
                                            ringColor={interest.ringColor}
                                            weight={interest.weight}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}