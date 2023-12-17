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
    const token = Cookies.get('token');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [notified, setNotified] = useState(false);
  
    const axios = require('axios');
    const qs = require('qs');

    var updateInterval = 3;
  
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
      const requested = [
        "username",
        "notifications"
      ];

      try {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getUserData',
          token: token,
          requested: requested
        });

        setData(response);
      } 
      
      catch (error) {
        console.error(error);
      }
    };
  
    const checkIfUserNotified = async () => {
      const requested = [
        "username",
        "notifications"
      ];

      try {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getUserData',
          token: token,
          requested: requested
        });

        setNotified(response.notifications.notified);
      } 
      
      catch (error) {
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
      if (userData == null) {
        fetchData();
      }

      else {
        setData(userData);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);
  
    useEffect(() => {
      if (data !== null) {
        const interval = setInterval(() => {
          checkIfUserNotified();
        }, 1000 * updateInterval);
  
        return () => {
          clearInterval(interval);
        };
      }
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, checkIfUserNotified, updateInterval]);

    return (
        <div className="flex flex-row justify-between items-center w-full lg:px-12 max-w mt-0 px-6 pt-20">
          {isBack ? <Back defaultEvent={async () => { await checker(); }} destination={destination} /> : <MenuButton toggleMenu={toggleMenu} />}
          {data && <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} userData={data} />}
          <h1 className='text-xl text-center text-whiteT1 font-bold'>{pageTitle}</h1>
          <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={notified} />
          {data && <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} userData={data} />}
        </div>
    );
}

export default PageHeader;