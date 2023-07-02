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
import { interestsData } from '@/src/components/interestsData';
export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function Profile() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };


    // const id = Cookies.get('user');

    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const axios = require('axios');
    // const qs = require('qs');

    // const makeRequest = async (url, data) => {
    //     try {
    //         const response = await axios.post(url, qs.stringify(data));
    //         return response.data;
    //     }

    //     catch (error) {
    //         throw new Error(`Request failed: ${error}`);
    //     }
    // };

    // const fetchData = async () => {
    //     try {
    //         const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'getUserData', id: id });
    //         setData(response);
    //     }

    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    // if (!data) {
    //     return (
    //         <div className="h-screen w-full flex justify-center content-center items-center">
    //             <Loading />
    //         </div>
    //     );
    // }

    // var { name, username, about, followers, following, events, interests } = data;

    // var interests = JSON.parse(interests).interests;

    var profileimg = 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f02e97244dbeacaef9f5ac951db62d6-1659364891510/aa73f77a-cb42-4566-9d3f-30cb2059cb26.png'

    const name = "Joao Davi";
    const username = "joaodavisn";
    const followers = "1";
    const following = "1";
    const about = "Eu curto ir em resenhas, pode me chamar pra todas que eu sempre vou. Geralmente eu trabalho aqui nessa plataforma trazendo problema pros dev 🐸.";
    const [userInterests, setUserInterests] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    interestsData.filter(interest => userInterests.includes(interest.id))
    const [tempUserInterests, setTempUserInterests] = useState(userInterests);

    const [activeTab, setActiveTab] = useState('Sobre');

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
                                    <h1 className='font-bold text-2xl'>{name}</h1>
                                    <h3 className='font-normal text-sm'>{'@' + username}</h3>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <NumberDisplay amount={followers} label={'Seguindo'} />
                                    <div className='h-[80%] w-[1px] bg-whiteT1 rounded-full' />
                                    <NumberDisplay amount={following} label={'Seguidores'} />
                                </div>
                                <div>
                                    <EditButton content="Editar perfil" onClick={() => handleNavigation('perfil/editar')} />
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
                                        <div className='w-full mt-8'>
                                            <h1 className='font-bold text-lg'>Interesses</h1>
                                            <div className='w-full flex flex-wrap gap-1'>
                                                {interestsData.filter(interest => userInterests.includes(interest.id)).map(interest => (
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
                                        RESENHAS
                                    </div>
                                )}

                                {activeTab === 'Comentários' && (
                                    <div> {/* CONTEUDO DE COMENTÁRIOS */}
                                        COMENTÁRIOS
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