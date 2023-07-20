'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import Toggle from '@/src/components/Toggle';

export default function NotificationConfig() {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [messageEnabled, setMessageEnabled] = useState(false);
    const [recommendationEnabled, setRecommendationEnabled] = useState(false);

    const handleNotificationToggle = () => {
        setNotificationEnabled(!notificationEnabled);
    };

    const handleEmailToggle = () => {
        setEmailEnabled(!emailEnabled);
    };

    const handleMessageToggle = () => {
        setMessageEnabled(!messageEnabled);
    };

    const handleRecommendationToggle = () => {
        setRecommendationEnabled(!recommendationEnabled);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Notificações" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-3 flex flex-col">
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-whiteT1 text-lg flex-1 font-semibold">Notificações</p>
                                    <Toggle onToggle={handleNotificationToggle} checked={notificationEnabled} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-whiteT1 text-lg flex-1 font-semibold">E-mail</p>
                                    <Toggle onToggle={handleEmailToggle} checked={emailEnabled} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-whiteT1 text-lg flex-1 font-semibold">Mensagens</p>
                                    <Toggle onToggle={handleMessageToggle} checked={messageEnabled} />
                                </div>
                                <hr className="border-purpleT4" />
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-whiteT1 text-lg flex-1 font-semibold">Recomendações</p>
                                    <Toggle onToggle={handleRecommendationToggle} checked={recommendationEnabled} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
