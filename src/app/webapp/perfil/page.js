'use client'
import EditButton from '@/src/components/EditButton';
import React from 'react';
import NumberDisplay from '@/src/components/NumberDisplay';
import Interest from '@/src/components/Interest';
import PageHeader from '@/src/components/PageHeader';
import Vector from '@/src/components/Vector';

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function Profile() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };


    var username = "Joao Davi";
    var user = "joaodavisn";
    var followers = 213;
    var following = 321;
    var events = 21;
    var aboutme = 'Vamo curtir rapaziadaaaaa!';
    var profileimg = 'https://resenha.app/publico/recursos/imagens/u/am9hb2Rhdmlzbg==.jpeg'
    var interestslist = [1, 2, 3, 4, 5]
    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Perfil'} />
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex '>
                        <div className='w-full flex flex-col items-center '>
                            <div className='flex flex-col items-center gap-4 w-full'>
                                <img src={profileimg} className='w-40 h-40 object-cover ring-2 ring-purpleT3 rounded-full' />
                                <div className='flex flex-col items-center'>
                                    <div className='flex flex-row items-center content-center gap-1'><h1 className='font-bold text-2xl'>{username}</h1><Vector vectorname={'verified01'} /></div>
                                    <h3 className='font-normal text-sm'>{'@' + user}</h3>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <NumberDisplay amount={followers} label={'seguidores'} />
                                    <div className='h-full w-[2px] bg-whiteT1 rounded-full' />
                                    <NumberDisplay amount={following} label={'seguindo'} />
                                    <div className='h-full w-[2px] bg-whiteT1 rounded-full' />
                                    <NumberDisplay amount={events} label={'resenhas'} />
                                </div>
                                <div>
                                    <EditButton content="Editar perfil" onClick={() => handleNavigation('perfil/editar')}/>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h1 className='font-bold text-xl'>Sobre</h1>
                                <p>{aboutme}</p>
                            </div>
                            <div className='w-full mt-8'>
                                <h1 className='font-bold text-xl'>Interesses</h1>
                                <div className='w-full flex flex-wrap gap-1'>
                                    {interestslist.map((interest, index) =>
                                        <Interest key={index} interestIndex={interest} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}