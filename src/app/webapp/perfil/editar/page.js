'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import UserProfileEditor from '@/src/components/UserProfileEditor';
import Vector from '@/src/components/Vector';
import Modal from '@/src/components/Modal';
import Interest from '@/src/components/Interest';
import Button from '@/src/components/Button';
import ModalButton from '@/src/components/ModalButton';
import EditInfoPage from '@/src/components/EditInfoPage';

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
    var isVerified = true;
    const [isUnsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);


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
                            <button onClick={() => setUsernameModalOpen(true)} className='flex flex-row items-center gap-2 w-fit py-2 px-4 rounded-2xl'>
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-row items-center justify-center content-center gap-1'>
                                        <h1 className='font-bold text-2xl'>{username}</h1>{isVerified && <Vector vectorname={'verified02'} />}
                                    </div>
                                    <h3 className='font-normal text-sm'>{'@' + user}</h3>
                                </div>
                                <div className='right-0 top-0 bg-whiteT1 ring-1 ring-whiteT2 ring-inset shadow-lg p-2 rounded-full'>
                                    <Vector vectorname={'edit01'} />
                                </div>
                            </button>
                        </div>
                        <div className='w-full'>
                            <button onClick={() => setAboutmeModalOpen(true)} className='w-full flex flex-col rounded-2xl'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='font-bold text-xl'>Sobre</h1>
                                    <div className='right-0 top-0 w-fit h-fit bg-whiteT1 ring-1 ring-whiteT2 ring-inset shadow-lg p-2 rounded-full'>
                                        <Vector vectorname={'edit01'} />
                                    </div>
                                </div>
                                <p>{aboutme}</p>
                            </button>
                        </div>
                        <div className='w-full'>
                            <div className='w-full gap-4 flex flex-col rounded-2xl'>
                                <div className='flex flex-row justify-between w-full'>
                                    <h1 className='font-bold text-xl'>Interesses</h1>
                                </div>
                                <div className='w-full flex flex-wrap gap-2'>
                                    <Interest interestIndex={1} isRemovable={true} removeEvent={() => { }} />
                                    <Interest interestIndex={2} isRemovable={true} removeEvent={() => { }} />
                                    <Interest interestIndex={3} isRemovable={true} removeEvent={() => { }} />
                                    <button
                                        className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-1 rounded-full ring-1 ring-inset ring-purpleT4"
                                        onClick={() => setModalOpen(true)}
                                    >
                                        <h1>Adicionar</h1>
                                        <Vector vectorname={'plus02'} />
                                    </button>
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