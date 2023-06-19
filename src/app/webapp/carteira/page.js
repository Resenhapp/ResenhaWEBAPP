'use client'
import EditButton from '@/src/components/EditButton';
import NotificationsButton from '@/src/components/NotificationsButton';
import Notifications from '@/src/components/Notifications';
import MenuButton from '@/src/components/MenuButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';
import NumberDisplay from '@/src/components/NumberDisplay';
import Interest from '@/src/components/Interest';
import MoneyDisplay from '@/src/components/MoneyDisplay';
import Button from '@/src/components/Button';

export const metadata = {
    title: 'Resenha.app • Carteira',
    description: 'Venha fazer suas resenhas!',
}

export default function Wallet() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    const handleNavigation = () => {
        window.location.href = `/webapp/carteira/saque`;
    };

    var availableCash = '1000,00';

    return (
        <div className='flex flex-col w-screen h-screen '>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Carteira</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <MoneyDisplay amount={100} cashType="available" />
                            <MoneyDisplay amount={100} cashType="secured" />
                            <MoneyDisplay amount={100} cashType="processing" />
                            <MoneyDisplay amount={100} cashType="requested" />
                        </div>
                        <div>
                        <Button label={'Solicitar saque'} icon={'arrow'} action={handleNavigation} iconSide='right' height={1} width={1} textAlign='left' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}