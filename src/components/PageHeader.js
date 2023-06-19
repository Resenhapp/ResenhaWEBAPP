'use client'
import React, { useState } from 'react';

import MenuButton from '@/src/components/MenuButton';
import Notifications from '@/src/components/Notifications';
import NotificationsButton from '@/src/components/NotificationsButton';
import Menu from '@/src/components/Menu';

const PageHeader = ({ pageTitle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };
    return (
        <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
            <MenuButton toggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <h1 className='text-2xl text-whiteT1 font-bold'>{pageTitle}</h1>
            <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
            <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
        </div>
    )
}

export default PageHeader;