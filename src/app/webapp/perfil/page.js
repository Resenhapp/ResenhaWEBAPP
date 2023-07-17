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
    var u = Cookies.get('username');
    var validator = Cookies.get('validator');

    if (!u || !validator) {
        window.location.href = '/login';
    }

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        var profile = urlParams.get('u');
    }

    const axios = require('axios');
    const qs = require('qs');

    const [activeTab, setActiveTab] = useState('Sobre');
    const [data, setData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    const [followersCount, setFollowersCount] = useState(data ? data.followers : 0);

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
                username: profile,
                validator: validator,
                comparison: u,
            });
            setData(response);
            setIsFollowing(response.follower);
            setFollowersCount(response.followers);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    const handleFollowButton = async (follower) => {
        setIsFollowing(follower);
        setFollowersCount((prevCount) => parseInt(prevCount) + (follower ? 1 : -1));

        try {
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'switchFollowUser',
                username: u,
                validator: validator,
                profile: profile,
            });
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    var { name, username, about, following, interests, comments, verified, hash, mine, partiesWent, follower } = data

    interestsData.filter(interest => interests.map(Number).includes(interest.id))

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Perfil'}/>
            <div className="flex flex-col justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex '>
                        <div className='w-full flex flex-col items-center '>
                            <div className='flex flex-col items-center gap-4 w-full'>
                                <img src={`https://media.resenha.app/u/${hash}.png`} className='w-40 h-40 object-cover ring-1 ring-purpleT3 rounded-full' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-bold text-2xl flex flex-row justify-center items-center gap-1'>
                                        {name}
                                        {verified == true && <Vector vectorname={'verified02'}/>}
                                    </h1>
                                    <h3 className='font-normal text-sm'>{'@' + username}</h3>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <NumberDisplay amount={following} label={'Seguindo'}/>
                                    <div className='h-[80%] w-[1px] bg-whiteT1 rounded-full'/>
                                    <NumberDisplay amount={followersCount} label={'Seguidores'}/>
                                </div>
                                <div>
                                    {mine ? (
                                        <EditButton content="Editar perfil" onClick={() => handleNavigation('perfil/editar')}/>
                                    ) : (
                                        <div className='flex flex-row gap-2'>
                                            <FollowButton onClick={handleFollowButton} isFollowing={isFollowing}/>
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
                                            {interests.length > 0 && (
                                                <>
                                                    <h1 className='font-bold text-lg'>Interesses</h1>
                                                    <div className='w-full flex flex-wrap gap-1'>
                                                        {interestsData
                                                            .filter((interest) => interests.map(Number).includes(interest.id))
                                                            .map((interest) => (
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
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Resenhas' && (
                                    <div>
                                        {/* CONTEUDO DE RESENHAS */}
                                        <div className="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                        {partiesWent.some((party) => party.used !== 1) && (
                                            <div className='text-purpleT5'>
                                            Vou
                                            </div>
                                        )}
                                        {partiesWent.map((party) => (
                                            party.used !== 1 ? (
                                            <ProfileEvent
                                                key={party.hash}
                                                imageUrl={`https://media.resenha.app/r/${party.hash}.png`}
                                                partyGuests={party.confirmed}
                                                partyDate={party.date}
                                                partyHour={party.time}
                                                partyName={party.name}
                                            />
                                            ) : null
                                        ))}
                                        {partiesWent.some((party) => party.used === 1) && (
                                            <div className='text-purpleT5'>
                                            Fui
                                            </div>
                                        )}
                                        {partiesWent.map((party) => (
                                            party.used === 1 ? (
                                            <ProfileEvent
                                                key={party.hash}
                                                imageUrl={`https://media.resenha.app/r/${party.hash}.png`}
                                                partyGuests={party.confirmed}
                                                partyDate={party.date}
                                                partyHour={party.time}
                                                partyName={party.name}
                                            />
                                            ) : null
                                        ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Comentários' && (
                                    <div> {/* CONTEUDO DE COMENTÁRIOS */}
                                        <div className="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                        {comments.map((comment) => (
                                            <Comment
                                                userName={comment.name}
                                                imageUrl={`https://media.resenha.app/u/${SHA256(comment.user)}.png`}
                                                rate={parseInt(comment.rate)}
                                                comment={comment.content}
                                                day={parseInt(comment.date.split('/')[0])}
                                                month={parseInt(comment.date.split('/')[1])}
                                                userUrl={`http://localhost:3000/webapp/perfil?u=${comment.username}`}
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