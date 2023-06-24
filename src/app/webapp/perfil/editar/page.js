'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import UserProfileEditor from '@/src/components/UserProfileEditor';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';
import Interest from '@/src/components/Interest';
import Button from '@/src/components/Button';

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function EditProfile() {
    const [checkerCallback, setCheckerCallback] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    const CurrentProfile = 'https://resenha.app/publico/recursos/imagens/u/am9hb2Rhdmlzbg==.jpeg'

    var username = "João Davi S. N.";
    var user = "joaodavisn";
    var aboutme = 'Vamo curtir rapaziadaaaaa!';

    const [hasChange, setHasChange] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const labels = ['Gamer', 'Eventos', 'Música', 'Arte', 'Fimes', 'Outros', 'Anime', 'Cultura', 'Baile Funk', 'Festa Temática', 'LGBTQ+', 'Nerd', 'F1', 'Pool Party', 'Novas experiências'];
    const allInterests = ['Gamer', 'Eventos', 'Música', 'Arte', 'Fimes', 'Outros', 'Anime', 'Cultura', 'Baile Funk', 'Festa Temática', 'LGBTQ+', 'Nerd', 'F1', 'Pool Party', 'Novas experiências'];
    const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
    const [isAboutmeModalOpen, setAboutmeModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [newUser, setNewUser] = useState(user); // new state for user
    const [newAboutme, setNewAboutme] = useState(aboutme);
    const closeModal = () => setModalOpen(false);
    const [selectedInterests, setSelectedInterests] = useState([]);


    // The old "isModalOpen" is now "isUnsavedChangesModalOpen"
    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);

    // You still use "isModalOpen" for interests modal
    const [isInterestsModalOpen, setInterestsModalOpen] = useState(false);

    const toggleInterest = (interest) => {
        setSelectedInterests(prevInterests => {
            // if the interest is already selected, remove it
            if (prevInterests.includes(interest)) {
                return prevInterests.filter(i => i !== interest);
            }

            // otherwise, add the interest
            return [...prevInterests, interest];
        });
    };

    return (
        <div>
            <div className='flex flex-col w-screen h-screen'>
                <PageHeader
                    pageTitle={'Editar perfil'}
                    isBack={true}
                    checker={() => new Promise((resolve, reject) => {
                        if (hasChange) {
                            setUnsavedChangesModalOpen(true); // Changed here
                            setCheckerCallback(() => resolve);  // Set checkerCallback to resolve the promise
                        } else {
                            resolve(true); // if there are no changes, resolve immediately
                        }
                    })}
                />

                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <section className="flex flex-col gap-4 h-full items-center w-full max-w-md p-4">
                        <Modal show={isUnsavedChangesModalOpen} close={() => setUnsavedChangesModalOpen(false)}>
                            <div className='gap-2 flex flex-col'>
                                <h1 className='text-center'>Ei! Você tem alterações que não foram salvas! Vai sair sem salvar?</h1>
                                <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full ring-inset py-2 px-4' onClick={() => {
                                    if (typeof checkerCallback === 'function') {
                                        checkerCallback(false);   // <-- note this change
                                    }
                                    setModalOpen(false);
                                }}>Sim eu vou.</button>
                                <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full ring-inset py-2 px-4' onClick={() => {
                                    setUnsavedChangesModalOpen(false);
                                }}>Não, peraí!</button>
                            </div>

                        </Modal>

                        <Modal show={isModalOpen} close={closeModal}>
                            <h1 className='text-xl mb-2 font-bold'>Escolha Interesses!</h1>
                            <p>Os interesses servem para as pessoas entenderem melhor suas preferências</p>
                            <div className='flex flex-wrap gap-2 overflow-auto' style={{ maxHeight: '200px' }}>
                                {allInterests.map(interest => {
                                    const interestIndex = labels.indexOf(interest) + 1; // +1 because interestIndex starts from 1 in the Interest component
                                    return (
                                        <Interest
                                            interestIndex={interestIndex}
                                            isRemovable={false}
                                            isAppend={true}
                                            appendEvent={() => toggleInterest(interest)}
                                            key={interest}
                                        />
                                    )
                                })}
                            </div>
                        </Modal>
                        <Modal show={isUsernameModalOpen} close={() => setUsernameModalOpen(false)}>
                            <div className='gap-2 flex flex-col'>
                                <h1 className='text-center'>Editar nome e seu @</h1>
                                <input
                                    className='bg-purpleT1 placeholder-purpleT4 text-whiteT1 p-2 ring-2 ring-purpleT3 rounded-xl'
                                    type="text"
                                    placeholder="Nome"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                                <input
                                    className='bg-purpleT1 placeholder-purpleT4 text-whiteT1 p-2 ring-2 ring-purpleT3 rounded-xl'
                                    type="text"
                                    placeholder="usuário"
                                    value={newUser}
                                    onChange={(e) => setNewUser(e.target.value)}
                                />
                                <div className='w-full h-fit bg-redT1 ring-2 ring-redT3'>

                                </div>
                                <div className='flex flex-row gap-2 w-full'>
                                    <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full w-full ring-inset py-2 px-4' onClick={() => {
                                        setUsernameModalOpen(false);
                                        // do something with newUsername and newUser
                                    }}>Cancelar</button>
                                    <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full w-full ring-inset py-2 px-4' onClick={() => {
                                        setUsernameModalOpen(false);
                                        // do something with newUsername and newUser
                                    }}>Salvar</button>

                                </div>
                                <p className='text-[14px] text-center '>Atenção: você só pode alterar o seu nome <b>uma vez</b>.</p>
                            </div>
                        </Modal>

                        <Modal show={isAboutmeModalOpen} close={() => setAboutmeModalOpen(false)}>
                            <div className='gap-2 flex flex-col'>
                                <h1 className='text-center'>Conta um pouco sobre você</h1>
                                <textarea rows={4} className='bg-purpleT1 placeholder-purpleT4 text-whiteT1 p-2 ring-2 ring-purpleT3 rounded-xl' type="text" value={newAboutme} onChange={(e) => setNewAboutme(e.target.value)} />
                                <div className='flex flex-row gap-2 w-full'>
                                    <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full w-full ring-inset py-2 px-4' onClick={() => {
                                        setAboutmeModalOpen(false);
                                        // do something with the description
                                    }}>Cancelar</button>
                                    <button className='bg-purpleT3 ring-2 ring-purpleT4 rounded-full w-full ring-inset py-2 px-4' onClick={() => {
                                        setAboutmeModalOpen(false);
                                        // do something with the description
                                    }}>Salvar</button>

                                </div>
                            </div>
                        </Modal>

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
                            <button onClick={() => setUsernameModalOpen(true)} className='flex flex-row items-center gap-2 w-fit bg-purpleT1 py-2 px-4 rounded-2xl ring-2 ring-inset ring-purpleT3'>
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-row items-center content-center gap-1'>
                                        <h1 className='font-bold text-2xl'>{username}</h1><Vector vectorname={'verified01'} />
                                    </div>
                                    <h3 className='font-normal text-sm'>{'@' + user}</h3>
                                </div>
                                <div className='right-0 top-0 bg-whiteT1 ring-2 ring-whiteT2 ring-inset shadow-lg p-2 rounded-full'>
                                    <Vector vectorname={'edit01'} />
                                </div>
                            </button>
                        </div>
                        <div className='w-full'>
                            <button onClick={() => setAboutmeModalOpen(true)} className='w-full bg-purpleT1 flex flex-col ring-2 ring-inset ring-purpleT3 px-4 py-4 rounded-2xl'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='font-bold text-xl'>Sobre</h1>
                                    <div className='right-0 top-0 w-fit h-fit bg-whiteT1 ring-2 ring-whiteT2 ring-inset shadow-lg p-2 rounded-full'>
                                        <Vector vectorname={'edit01'} />
                                    </div>
                                </div>
                                <p>{aboutme}</p>
                            </button>
                        </div>
                        <div className='w-full'>
                            <div className='w-full bg-purpleT1 gap-4 flex flex-col ring-2 ring-inset ring-purpleT3 px-4 py-4 rounded-2xl'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='font-bold text-xl'>Interesses</h1>
                                </div>
                                <div className='w-full flex flex-wrap gap-2'>
                                    <Interest interestIndex={1} isRemovable={true} removeEvent={() => { }} />
                                    <Interest interestIndex={2} isRemovable={true} removeEvent={() => { }} />
                                    <Interest interestIndex={3} isRemovable={true} removeEvent={() => { }} />

                                    <button
                                        className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-1 rounded-full ring-2 ring-inset ring-purpleT4"
                                        onClick={() => setModalOpen(true)}
                                    >
                                        <h1>Adicionar</h1>
                                        <Vector vectorname={'plus02'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <button className='px-5 py-4'>Cancelar</button>
                            <Button label={'Salvar'} icon={'check'} action={() => handleNavigation('perfil')} iconSide='right' height={1} width={3} textAlign='center' />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}