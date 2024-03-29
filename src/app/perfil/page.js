'use client'

import EditButton from '@/src/components/EditButton';
import NumberDisplay from '@/src/components/NumberDisplay';
import Tag from '@/src/components/Tag';
import PageHeader from '@/src/components/PageHeader';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";
import FollowButton from '@/src/components/FollowButton';
import Vector from '@/src/components/Vector';
import SendMessageButton from '@/src/components/SendMessageButton';
import ProfileEvent from '@/src/components/ProfileEvent';
import Comment from '@/src/components/Comment';

import React, { useState, useEffect } from 'react';

import { interestsData } from '@/src/components/interestsData';

export default function Profile() {
    var token = Cookies.get('token');

    let urlParams = new URLSearchParams();

    const axios = require('axios');
    const qs = require('qs');

    const [activeTab, setActiveTab] = useState('Sobre');
    const [data, setData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isMutual, setIsMutual] = useState(false);
    const [followersCount, setFollowersCount] = useState(data ? data.followers : 0);

    if (!token && typeof window !== 'undefined') {
        window.location.href = '/login';
    }
    
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        var profile = urlParams.get('u');
    }

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getUserData',
            token: token,
            profile: profile
        });

        setData(response);

        setIsFollowing(response.mutual.follower);
        setFollowersCount(response.followers.followed);

        if (response.mutual.follower == true && response.mutual.following == true) {
            setIsMutual(true);
        }
    };

    const handleFollowButton = async (follower) => {
        setIsFollowing(follower);
        
        if (data.mutual.following) {
            setIsMutual(follower);
        }

        setFollowersCount((prevCount) => parseInt(prevCount) + (follower ? 1 : -1));

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'switchFollowUser',
            token: token,
            profile: profile
        });
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

    var { name, username, followers, about, interests, comments, verified, hash, mine, parties, mutual } = data

    interestsData.filter(interest => interests.map(Number).includes(interest.id))

    const uniqueParties = Array.from(new Set(parties.went.map(party => party.code))).map(code => parties.went.find(party => party.code === code));

    return (
        <div className='flex flex-col w-screen h-screen'>
            <PageHeader pageTitle={'Perfil'} userData={mine ? data : undefined}/>
            <div className="flex flex-col justify-start h-screen px-4 items-center">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex '>
                        <div className='w-full flex flex-col items-center '>
                            <div className='flex flex-col items-center gap-4 w-full'>
                                <img src={`https://media.resenha.app/u/${hash}.png`} className='w-40 h-40 object-cover ring-1 ring-purpleT3 rounded-full' alt='user image' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-bold text-2xl flex flex-row justify-center items-center gap-1'>
                                        {name}
                                        {verified == true && <Vector vectorname={'verified02'}/>}
                                    </h1>
                                    <h3 className='font-normal text-sm'>{'@' + username}</h3>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <NumberDisplay amount={followers.following} label={'Seguindo'}/>
                                    <div className='h-[80%] w-[1px] bg-whiteT1 rounded-full'/>
                                    <NumberDisplay amount={followersCount} label={'Seguidores'}/>
                                </div>
                                <div>
                                    {mine ? (
                                        <EditButton content="Editar perfil" onClick={() => handleNavigation('perfil/editar')}/>
                                    ) : (
                                        <div className='flex flex-row gap-2'>
                                            <FollowButton onClick={handleFollowButton} isFollowing={isFollowing}/>
                                            <SendMessageButton initialActiveState={isMutual} onClick={() => handleNavigation('chat?u='+profile) }/>
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
                                    <div>
                                        <div className='w-full'>
                                        <h1 className='font-bold text-lg'>Resumo</h1>
                                        {about && about.trim() !== "" ? (
                                            <p>{about}</p>
                                        ) : (
                                            <p>Ainda não decidi meu resumo 🥶</p>
                                        )}
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
                                    <div className="bg-scroll flex flex-col gap-2 h-[55vh] w-full overflow-y-auto">
                                    {uniqueParties.some(party => party.uses >= 1) && (
                                        <div className='text-purpleT5'>
                                            Vou
                                        </div>
                                        )}
                                        {uniqueParties.map((party) => (
                                        party.uses >= 1 ? (
                                            <ProfileEvent
                                            key={party.hash}
                                            imageUrl={`https://media.resenha.app/r/${party.hash}.png`}
                                            partyGuests={party.confirmed}
                                            partyDate={party.date}
                                            partyHour={party.start}
                                            partyName={party.name}
                                            eventCode={party.code}
                                            />
                                        ) : null
                                        ))}
                                        {uniqueParties.some(party => party.uses == 0) && (
                                        <div className='text-purpleT5'>
                                            Fui
                                        </div>
                                        )}
                                        {uniqueParties.map((party) => (
                                        party.uses == 0 ? (
                                            <ProfileEvent
                                            key={party.hash}
                                            imageUrl={`https://media.resenha.app/r/${party.hash}.png`}
                                            partyGuests={party.confirmed}
                                            partyDate={party.date}
                                            partyHour={party.time}
                                            partyName={party.name}
                                            eventCode={party.code}
                                            />
                                        ) : null
                                    ))}
                                    {!(parties.went.some((party) => party.uses == 0) || parties.went.some((party) => party.uses >= 1)) && (
                                        <div className='text-base'>
                                            Ainda não participei de resenhas 😢
                                        </div>
                                    )}
                                    </div>
                                </div>
                                )}

                                {activeTab === 'Comentários' && (
                                    <div>
                                    <div className="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                      {comments.length > 0 ? (
                                        comments.map((comment) => (
                                          <div key={comment.id}>
                                            <Comment
                                              userName={comment.name}
                                              imageUrl={`https://media.resenha.app/u/${comment.hash}.png`}
                                              rate={parseInt(comment.rate)}
                                              comment={comment.content}
                                              day={parseInt(comment.date.split('/')[0])}
                                              month={parseInt(comment.date.split('/')[1])}
                                              userUrl={`https://resenha.app/perfil?u=${comment.username}`}
                                            />
                                          </div>
                                        ))
                                      ) : (
                                        <div className='text-base'>
                                          Por enquanto ninguém comentou por aqui 😢
                                        </div>
                                      )}
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