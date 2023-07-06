'use client'
import EditButton from '@/src/components/EditButton';
import React from 'react';
import NumberDisplay from '@/src/components/NumberDisplay';
import Tag from '@/src/components/Tag';
import PageHeader from '@/src/components/PageHeader';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from "react";
import { useEffect } from 'react';
import Loading from "@/src/components/Loading";
import FollowButton from '@/src/components/FollowButton';
import { interestsData } from '@/src/components/interestsData';
import Vector from '@/src/components/Vector';
import SendMessageButton from '@/src/components/SendMessageButton';
import ProfileEvent from '@/src/components/ProfileEvent';
import Comment from '@/src/components/Comment';
import SHA256 from 'crypto-js/sha256';

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function Profile() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };


    const id = Cookies.get('user');

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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
            const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getUserData', id: id });
            setData(response);
        }

        catch (error) {
            console.error(error);
        }
    };

    const [activeTab, setActiveTab] = useState('Sobre');

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    var { name, username, about, followers, following, events, interests, comments, verified } = data;

    var profileimg = 'https://media.resenha.app/u/joaodavi.jpg'

    var interests = JSON.parse(interests).interests;
    var comments = JSON.parse(comments).comments;

    interestsData.filter(interest => interests.includes(interest.id))

    console.log(verified)

    var isMyProfile = !true;

    console.log(comments)

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Perfil'} />
            <div className="flex flex-col justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex '>
                        <div className='w-full flex flex-col items-center '>
                            <div className='flex flex-col items-center gap-4 w-full'>
                                <img src={profileimg} className='w-40 h-40 object-cover ring-1 ring-purpleT3 rounded-full' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-bold text-2xl flex flex-row justify-center items-center gap-1'>
                                        {name}
                                        {verified == true && <Vector vectorname={'verified02'} />}
                                    </h1>
                                    <h3 className='font-normal text-sm'>{'@' + username}</h3>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <NumberDisplay amount={followers} label={'Seguindo'} />
                                    <div className='h-[80%] w-[1px] bg-whiteT1 rounded-full' />
                                    <NumberDisplay amount={following} label={'Seguidores'} />
                                </div>
                                <div>
                                    {isMyProfile ? (
                                        <EditButton content="Editar perfil" onClick={() => handleNavigation('perfil/editar')} />
                                    ) : (
                                        <div className='flex flex-row gap-2'>
                                            <FollowButton />
                                            <SendMessageButton onClick={() => handleNavigation('/chat')}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col bg- w-full mt-5'>
                                <div className='flex flex-row justify-between mb-4'>
                                    <button className={`uppercase ${activeTab === 'Sobre' ? 'text-whiteT1 underline underline-offset-4 underline-t-3' : 'text-purpleT5'}`} onClick={() => setActiveTab('Sobre')}>Sobre</button>
                                    <button className={`uppercase ${activeTab === 'Resenhas' ? 'text-whiteT1 underline underline-offset-4 underline-t-3' : 'text-purpleT5'}`} onClick={() => setActiveTab('Resenhas')}>Resenhas</button>
                                    <button className={`uppercase ${activeTab === 'Comentários' ? 'text-whiteT1 underline underline-offset-4 underline-t-3' : 'text-purpleT5'}`} onClick={() => setActiveTab('Comentários')}>Comentários</button>
                                </div>

                                {activeTab === 'Sobre' && (
                                    <div> {/* CONTEUDO DE SOBRE */}
                                        <div className='w-full'>
                                            <h1 className='font-bold text-lg'>Resumo</h1>
                                            <p>{about}</p>
                                        </div>
                                        <div className='w-full mt-4'>
                                            <h1 className='font-bold text-lg'>Interesses</h1>
                                            <div className='w-full flex flex-wrap gap-1'>
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
                                )}

                                {activeTab === 'Resenhas' && (
                                    <div> {/* CONTEUDO DE RESENHAS */}
                                        <div class="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                            <div className='text-purpleT5'>
                                                Vou
                                            </div>
                                            <ProfileEvent
                                                imageUrl={'https://resenha.app/publico/recursos/resenhas/DGPcBwzI.png'}
                                                partyGuests={'480'}
                                                partyDate={'12/07'}
                                                partyHour={'21:30'}
                                                partyName={'Resenha no Terraço'}
                                            />
                                            <div className='text-purpleT5'>
                                                Fui
                                            </div>
                                            <ProfileEvent
                                                imageUrl={'https://resenha.app/publico/recursos/resenhas/QljskFiO.png'}
                                                partyGuests={'480'}
                                                partyDate={'17/03'}
                                                partyHour={'20:00'}
                                                partyName={'Show na CB'}
                                            />
                                            <ProfileEvent
                                                imageUrl={'https://resenha.app/publico/recursos/resenhas/mjCvJEPv.jpg'}
                                                partyGuests={'480'}
                                                partyDate={'01/03'}
                                                partyHour={'22:00'}
                                                partyName={'Rolezin dos cria'}
                                            />
                                            <ProfileEvent
                                                imageUrl={'https://resenha.app/publico/recursos/resenhas/lr_dEUsxUJp.png'}
                                                partyGuests={'480'}
                                                partyDate={'23/02'}
                                                partyHour={'21:00'}
                                                partyName={'Baderninha do Rik'}
                                            />
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'Comentários' && (
                                    <div> {/* CONTEUDO DE COMENTÁRIOS */}
                                        <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                        {comments.map((comment) => (
                                            <Comment
                                                userName={comment.userName}
                                                imageUrl={`https://media.resenha.app/u/${SHA256(comment.userId.toString())}.png`}
                                                rate={comment.rate}
                                                comment={comment.comment}
                                                day={parseInt(comment.date.split('/')[0])}
                                                month={parseInt(comment.date.split('/')[1])}
                                                userUrl="https://resenha.app/"
                                            />
                                        ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}