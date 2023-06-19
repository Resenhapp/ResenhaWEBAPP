'use client'
import Button from '@/src/components/Button';
import MenuButton from '@/src/components/MenuButton';
import Notifications from '@/src/components/Notifications';
import NotificationsButton from '@/src/components/NotificationsButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';
import ConciergePortrait from '@/src/components/ConciergePortrait';
export const metadata = {
    title: 'Resenha.app • Recepcionistas',
    description: 'Venha fazer suas resenhas!',
}
export default function Concierges() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Recepcionistas</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col items-centser justify-center h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='h3 w-full flex '>
                        <div className='w-full flex flex-col '>
                        <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                <ConciergePortrait imgUrl={'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png'} activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'}/>
                                <ConciergePortrait imgUrl={'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png'} activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'}/>
                                <ConciergePortrait imgUrl={'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png'} activeStatus={true} conciergeName={'Claudio'} conciergeToken={'QEWF34'} expirationDate={'26/11/2023'}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
