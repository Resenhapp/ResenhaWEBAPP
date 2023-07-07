'use client'

import React, { useState } from 'react';
import MenuButton from '@/src/components/MenuButton';
import Notifications from '@/src/components/Notifications';
import NotificationsButton from '@/src/components/NotificationsButton';
import Menu from '@/src/components/Menu';
import Back from './Back';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

const PageHeader = ({ pageTitle, isBack = false, checker }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    var username = Cookies.get('username');
    var validator = Cookies.get('validator');

    const [data, setData] = useState(null);

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
            const response = await makeRequest('http://localhost/resenha.app/api/', {
                request: 'getUserData',
                username: username,
                validator: validator
            });
            setData(response);
        } 
        
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
          {isBack ? <Back defaultEvent={async () => { await checker(); }}/> : <MenuButton toggleMenu={toggleMenu} />}
          {data && <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} userData={data} />}
          <h1 className='text-xl text-center text-whiteT1 font-bold'>{pageTitle}</h1>
          <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
          {data && <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} userData={data} />}
        </div>
      );
      
}

export default PageHeader;