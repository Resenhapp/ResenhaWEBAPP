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

const PageHeader = ({ pageTitle, isBack = false, checker, userData, destination }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [notified, setNotified] = useState(false);
  
    const username = Cookies.get('username');
    const validator = Cookies.get('validator');
  
    const axios = require('axios');
    const qs = require('qs');

    var updateInterval = 150;
  
    const makeRequest = async (url, data) => {
      try {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
      } catch (error) {
        throw new Error(`Request failed: ${error}`);
      }
    };
  
    const fetchData = async () => {
      try {
        const response = await makeRequest('http://localhost/resenha.app/api/', {
          request: 'getUserData',
          username: username,
          validator: validator,
        });
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    const checkIfUserNotified = async () => {
      try {
        const response = await makeRequest('http://localhost/resenha.app/api/', {
          request: 'getUserData',
          username: username,
          validator: validator,
          requested: 'notified',
        });
        setNotified(response.notified);
      } catch (error) {
        console.error(error);
      }
    };
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const toggleNotifications = () => {
      setIsNotificationsOpen(!isNotificationsOpen);
    };
  
    useEffect(() => {
      if (data === null) {
        fetchData();
      }
    }, [data]);
  
    useEffect(() => {
      if (data !== null) {
        const interval = setInterval(() => {
          checkIfUserNotified();
        }, 1000 * updateInterval);
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [data]);

    return (
        <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
          {isBack ? <Back defaultEvent={async () => { await checker(); }} destination={destination} /> : <MenuButton toggleMenu={toggleMenu} />}
          {data && <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} userData={data} />}
          <h1 className='text-xl text-center text-whiteT1 font-bold'>{pageTitle}</h1>
          <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={notified} />
          {data && <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} userData={data} />}
        </div>
    );
}

export default PageHeader;