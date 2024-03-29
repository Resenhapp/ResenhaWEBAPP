'use client'

import React from 'react';
import Notification from './Notification';
import Cookies from 'js-cookie';
import { useState } from "react";
import { useEffect } from 'react';

const Notifications = ({ isOpen, toggleNotifications, userData }) => {
    const token = Cookies.get('token');

    if (!token && typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    const axios = require('axios');
    const qs = require('qs');

    const [showNotifications, setShowNotifications] = useState(true);
    const [notifications, setNotifications] = useState([]);

    var updateInterval = 3;
  
    const makeRequest = async (url, data) => {
      const response = await axios.post(url, qs.stringify(data));
      return response.data;
    };
  
    const clearUserNotifications = async () => {
      const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
        request: 'clearUserNotifications',
        token: token
      });
    };
  
    const seeUserNotifications = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'seeUserNotifications',
          token: token
        });
    };

    const getUserData = async () => {
        const requested = [
          "notifications"
        ];

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
          request: 'getUserData',
          token: token,
          requested: requested
        });

        setNotifications(response.notifications.notifications);
    };

    useEffect(() => {
      if (userData.notifications.notifications.length > 0) {
        setNotifications(userData.notifications.notifications);
      } 
    }, [userData.notifications.notifications]);
  
    useEffect(() => {
      if (isOpen) {
        seeUserNotifications();

        const interval = setInterval(() => {
            getUserData();
            setShowNotifications(true);
        }, 1000 * updateInterval);
      
        return () => {
            clearInterval(interval);
        };
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, getUserData, seeUserNotifications, updateInterval]);
  
  
    const handleClearButton = async () => {
      setShowNotifications(false);
      await clearUserNotifications();
    };

    return (
        <div className={`fixed top-0 right-0 w-full xl:max-w-[480px] h-full bg-purpleT0 z-10 transition-transform duration-300 ease-in-out overflow-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-row-reverse justify-between items-center w-full mt-0 px-6 pt-20">
                <h1 className='text-2xl px-4 text-purpleT5 font-light'>Notificações</h1>
                <button onClick={toggleNotifications} className="p-4">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6M6 6L1 11M6 6L11 11M6 6L11 1" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4 gap-4">
            </section>
            <div className="flex flex-col items-center justify-center px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 mt-4 flex flex-col'>
                                <p>Abaixo você pode conferir todas as suas notificações!</p>
                                <div className="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                    {showNotifications && notifications && notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                          <div key={notification.id}>
                                              <Notification
                                                  title={notification.title} 
                                                  content={notification.content}
                                              />
                                          </div>
                                        ))
                                    ) : (
                                        <p>Voce não tem nenhuma notificação.</p>
                                    )}
                                    <button className='w-full h-fit px-4 py-5 bg-purpleT2 text-whiteT1 rounded-xl' onClick={handleClearButton}>
                                        Limpar notificações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Notifications;