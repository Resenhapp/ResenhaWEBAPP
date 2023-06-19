'use client'
import OutlinedButton from '@/src/components/OutlinedButton';
import MyEventsBanner from '@/src/components/MyEventsBanner';
import Button from '@/src/components/Button';
import MenuButton from '@/src/components/MenuButton';
import SearchInput from '@/src/components/SearchInput';
import Notifications from '@/src/components/Notifications';
import NotificationsButton from '@/src/components/NotificationsButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';

export const metadata = {
    title: 'Resenha.app • Configurações',
    description: 'Venha fazer suas resenhas!',
}
export default function Settings() {
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
                <h1 className='text-2xl text-whiteT1 font-bold'>Configurações</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 flex flex-col'>
                                <Button label={'Conta'} icon={'user'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Segurança'} icon={'shield'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Privacidade'} icon={'lock'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Pagamentos'} icon={'money'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Notificações'} icon={'bell'} action={() => { }} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
