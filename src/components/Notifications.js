'use client'

import React from 'react';
import Notification from './Notification';
import Cookies from 'js-cookie';
import ButtonConfig from './ButtonConfig';
import { useState } from "react";
import { useEffect } from 'react';

const Notifications = ({ isOpen, toggleNotifications, userData }) => {
    const [showNotifications, setShowNotifications] = useState(true);
    const [notifications, setNotifications] = useState(userData.notifications);

    const username = Cookies.get('username');
    const validator = Cookies.get('validator');
  
    const axios = require('axios');
    const qs = require('qs');

    var updateInterval = 150;
  
    const makeRequest = async (url, data) => {
      try {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
      } 
      
      catch (error) {
        throw new Error(`Request failed: ${error}`);
      }
    };
  
    const clearUserNotifications = async () => {
      try {
        const response = await makeRequest('http://localhost/resenha.app/api/', {
          request: 'clearUserNotifications',
          username: username,
          validator: validator,
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    const seeUserNotifications = async () => {
      try {
        const response = await makeRequest('http://localhost/resenha.app/api/', {
          request: 'seeUserNotifications',
          username: username,
          validator: validator,
        });
      } 
      
      catch (error) {
        console.error(error);
      }
    };

    const getUserData = async () => {
        try {
          const response = await makeRequest('http://localhost/resenha.app/api/', {
            request: 'getUserData',
            username: username,
            validator: validator,
            requested: 'notifications',
          });
          setNotifications(response.notifications);
        } 
        
        catch (error) {
          console.error(error);
        }
    };
  
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
    }, [isOpen]);
  
  
    const handleClearButton = async () => {
      setShowNotifications(false);
      await clearUserNotifications();
    };

    return (
        <div className={`fixed top-0 right-0 w-full h-full bg-purpleT0 z-10 transition-transform duration-300 ease-in-out overflow-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                                    {showNotifications && notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <Notification
                                                title={notification.title} 
                                                content={notification.content}
                                            />
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