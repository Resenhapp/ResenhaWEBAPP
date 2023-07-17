'use client'
import React, { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import ChatInput from '@/src/components/ChatInput';
import ChatBubble from '@/src/components/ChatBubble';

export const metadata = {
    title: 'Resenha.app • Chat',
    description: 'Venha fazer suas resenhas!',
}

export default function Chat() {
    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    const [messages, setMessages] = useState([
        {
            imageUrl: 'https://resenha.app/publico/recursos/imagens/u/fe.jpg',
            message: 'Mano, você já imaginou como seria viver em Marte?',
            timestamp: '10:12',
            sent: false
        },
        {
            imageUrl: 'https://resenha.app/publico/recursos/imagens/u/fe.jpg',
            message: 'Mano, você já imaginou como seria viver em Marte?',
            timestamp: '10:12',
            sent: true
        },
    ]);

    const sendMessage = (message) => {
        const now = new Date();
        const timestamp = now.getHours() + ':' + now.getMinutes();

        const newMessage = {
            imageUrl: '',
            message,
            timestamp,
            sent: true
        };

        setMessages((oldMessages) => [...oldMessages, newMessage]);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Chat" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div className="bg-scroll flex flex-col gap-2 h-[65vh] w-full overflow-y-auto">
                                    {messages.map((message, index) => (
                                        <ChatBubble
                                            key={index}
                                            imageUrl={message.imageUrl}
                                            message={message.message}
                                            timestamp={message.timestamp}
                                            sent={message.sent}
                                        />
                                    ))}
                                </div>
                                <ChatInput onSendMessage={sendMessage} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
