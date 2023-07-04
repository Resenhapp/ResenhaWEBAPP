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

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function EditProfile() {
    const [checkerCallback, setCheckerCallback] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    const CurrentProfile = 'https://resenha.app/publico/recursos/imagens/u/am9hb2Rhdmlzbg==.jpeg'

    const [hasChange, setHasChange] = useState(false);
    var isVerified = true;
    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);



    // INTERESTS LOGIC    // INTERESTS LOGIC    // INTERESTS LOGIC    // INTERESTS LOGIC    // INTERESTS LOGIC    // INTERESTS LOGIC
    const [isEditInterestsPageOpen, setIsEditInterestsPageOpen] = useState(false);
    const [userInterests, setUserInterests] = useState([1, 2, 4]);
    const [tempUserInterests, setTempUserInterests] = useState(userInterests);
    const [allInterests, setAllInterests] = useState(
        [...interestsData].map((interest) => {
            const isSelected = userInterests.includes(interest.id);
            return { ...interest, selected: isSelected };
        }).sort((a, b) => b.selected - a.selected)
    );

    useEffect(() => {
        setTempUserInterests(userInterests);
    }, [userInterests]);

    useEffect(() => {
        setAllInterests(
            [...interestsData].map((interest) => {
                const isSelected = tempUserInterests.includes(interest.id);
                return { ...interest, selected: isSelected };
            }).sort((a, b) => b.selected - a.selected)
        );
    }, [tempUserInterests]);

    const toggleEditInterestsPageOpen = () => {
        if (isEditInterestsPageOpen) {
            setTempUserInterests(userInterests);
        }
        setIsEditInterestsPageOpen(!isEditInterestsPageOpen);
    };

    const handleInterestClick = (interestId) => {
        setTempUserInterests(
            tempUserInterests.includes(interestId)
                ? tempUserInterests.filter(id => id !== interestId)
                : [...tempUserInterests, interestId]
        );
    };

    const saveInterests = () => {
        setUserInterests(tempUserInterests);
        toggleEditInterestsPageOpen();
        setHasChange(true);
    };

    const validUserInterests = userInterests.filter(interestId => allInterests.some(interest => interest.id === interestId));
    const renderInterests = validUserInterests.map(interestId => allInterests.find(interest => interest.id === interestId));

    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC    // NAME LOGIC
    const [username, setUsername] = useState("João Davi");
    const [tempUsername, setTempUsername] = useState(username);
    const [handle, setHandle] = useState("joaodavisn");
    const [tempHandle, setTempHandle] = useState(handle);

    useEffect(() => {
        setTempUsername(username);
        setTempHandle(handle);
    }, [username, handle]);

    const [isEditUsernamePageOpen, setIsEditUsernamePageOpen] = useState(false);
    const toggleEditUsernamePageOpen = () => {
        if (isEditUsernamePageOpen) {
            // Reset tempUsername and tempHandle to their original values when closing the modal
            setTempUsername(username);
            setTempHandle(handle);
        }
        setIsEditUsernamePageOpen(!isEditUsernamePageOpen);
    };

    const handleUsernameChange = (event) => {
        setTempUsername(event.target.value);
    };

    const handleHandleChange = (event) => {
        setTempHandle(event.target.value);
    };

    const saveUsernameAndHandle = () => {
        setUsername(tempUsername);
        setHandle(tempHandle);
        toggleEditUsernamePageOpen();
        setHasChange(true);
    };
    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC    // ABOUT LOGIC

    const [isEditAboutPageOpen, setIsEditAboutPageOpen] = useState(false);
    var initialAbout = "Bisteca";
    const [about, setAbout] = useState(initialAbout);
    const [tempAbout, setTempAbout] = useState(about);

    useEffect(() => {
        setTempAbout(about);
    }, [about]);

    useEffect(() => {
        if (!isEditAboutPageOpen) {
            setTempAbout(about);
        }
    }, [isEditAboutPageOpen]);

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
    ///////////////////////////////////    ///////////////////////////////////    ///////////////////////////////////    ///////////////////////////////////

    return (
        <div>
            <div className='flex flex-col w-screen h-screen'>
                <PageHeader
                    pageTitle={'Editar perfil'}
                    isBack={true}
                    checker={() => new Promise((resolve, reject) => {
                        if (hasChange) {
                            setUnsavedChangesModalOpen(true);
                            setCheckerCallback(() => resolve);
                        } else {
                            resolve(true);
                        }
                    })}
                />
                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <section className="flex flex-col gap-4 h-full items-center w-full max-w-md p-4">
                        <Modal show={isUnsavedChangesModalOpen} close={() => setUnsavedChangesModalOpen(false)}>
                            <div className='gap-2 flex flex-col'>
                                <h1 className='text-center'>Ei! Você tem alterações que não foram salvas! Vai sair sem salvar?</h1>
                                <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full ring-inset py-2 px-4' onClick={() => {
                                    if (typeof checkerCallback === 'function') {
                                        checkerCallback(false);
                                    }
                                    setModalOpen(false);
                                }}>Sim eu vou.</button>
                                <button className='bg-purpleT2 ring-1 ring-purpleT3 rounded-full ring-inset py-2 px-4' onClick={() => {
                                    setUnsavedChangesModalOpen(false);
                                }}>Não, peraí!</button>
                            </div>
                        </Modal>
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
                                    value={tempUsername}
                                    onChange={handleUsernameChange}
                                />
                                <label className='font-bold'>Nome de usuário:</label>
                                <input
                                    className='w-full bg-transparent border-b-2 border-purpleT2 placeholder-purpleT4 text-whiteT1 '
                                    placeholder='@'
                                    value={tempHandle}
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
                                currentProfile={CurrentProfile}
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
                                        <h1 className='font-bold text-2xl'>{username}</h1>{isVerified && <Vector vectorname={'verified02'} />}
                                    </div>
                                    <h3 className='font-normal text-sm'>@{handle}</h3>
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
                            <div onClick={(e) => {
                                e.stopPropagation();
                                toggleEditInterestsPageOpen();
                            }}
                                className="bg-transparent ring-1 ring-inset ring-whiteT1 flex flex-col w-full h-fit p-2 gap-2 rounded-2xl"
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className='font-bold text-lg'>Interesses</h1>
                                    <Vector vectorname={'edit02'} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {renderInterests.map((interest) => (
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
                        <div className='w-full flex flex-row justify-between'>
                            <button className='px-5 py-4' onClick={() => window.history.back()}>Cancelar</button>
                            <Button label={'Salvar'} icon={'check'} action={() => handleNavigation('perfil')} iconSide='right' height={1} width={3} textAlign='center' />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}