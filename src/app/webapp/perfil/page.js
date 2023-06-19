'use client'
import EditButton from '@/src/components/EditButton';
import NotificationsButton from '@/src/components/NotificationsButton';
import Notifications from '@/src/components/Notifications';
import MenuButton from '@/src/components/MenuButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';
import NumberDisplay from '@/src/components/NumberDisplay';
import Interest from '@/src/components/Interest';

export const metadata = {
    title: 'Resenha.app • Perfil',
    description: 'Venha fazer suas resenhas!',
}

export default function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    var username = "Joao Davi";
    var user = "joaodavisn";
    var followers = 213;
    var following = 321;
    var events = 21;
    var aboutme = 'Vamo curtir rapaziadaaaaa!';

    return (
        <div className='flex flex-col w-screen h-screen '>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Perfil</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex '>
                        <div className='w-full flex flex-col items-center '>
                            <div className='flex flex-col items-center gap-4 w-full'>
                                <img src='https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9f02e97244dbeacaef9f5ac951db62d6-1659364891510/aa73f77a-cb42-4566-9d3f-30cb2059cb26.png' className='w-40 h-40 object-cover bg-purple-50 ring-2 ring-purpleT3 rounded-full' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-bold text-2xl'>{username}</h1>
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
                                    <EditButton content="Editar perfil" />
                                </div>
                            </div>
                            <div className='w-full'>
                                <h1 className='font-bold text-xl'>Sobre</h1>
                                <p>{aboutme}</p>
                            </div>
                            <div className='w-full mt-8'>
                                <h1 className='font-bold text-xl'>Interesses</h1>
                                <div className='w-full flex flex-wrap gap-1'>
                                    <Interest interestIndex={1} />
                                    <Interest interestIndex={2} />
                                    <Interest interestIndex={3} />
                                    <Interest interestIndex={4} />
                                    <Interest interestIndex={5} />
                                    <Interest interestIndex={6} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}