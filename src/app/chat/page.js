'use client'

import PageHeader from '@/src/components/PageHeader';
import ChatInput from '@/src/components/ChatInput';
import ChatBubble from '@/src/components/ChatBubble';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

import React, { useState, useEffect } from 'react';

export default function Chat() {
    var token = Cookies.get('token');

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const qs = require('qs');

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);

        const groupChat = urlParams.get('r');
        const dualChat = urlParams.get('u');

        if (dualChat !== null) {
            var chatCode = dualChat;
            var chatType = 'dm';
        }

        else if (groupChat !== null) {
            var chatCode = groupChat;
            var chatType = 'group';
        }
    }

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    const makeRequest = async (url, data) => {
        const response = await axios.post(url, qs.stringify(data));
        return response.data;
    };

    const fetchData = async () => {
        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'getMessages',
            token: token,
            code: chatCode,
            type: chatType
        });

        if (response.error) {
            window.history.back();
        }

        if (response && Array.isArray(response.messages)) {
            setMessages(response.messages);
        }

        setIsLoading(false);
    };

    const sendMessage = async (message) => {
        const now = new Date();
        const timestamp = now.getHours() + ':' + now.getMinutes();

        const newMessage = {
            imageUrl: '',
            content: message,
            date: now,
            sent: true
        };

        setMessages((oldMessages) => [...oldMessages, newMessage]);

        const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
            request: 'tryToSendMessage',
            token: token,
            destination: chatCode,
            type: chatType,
            content: message
        });
    };

    const messagesEndRef = React.useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    useEffect(() => {
        fetchData();

        const fetchInterval = 3000;
        const intervalId = setInterval(fetchData, fetchInterval);

        return () => clearInterval(intervalId);

    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader isBack={true} checker={() => { null }} pageTitle="Chat" />
            <div className="flex flex-col items-center justify-start h-screen px-4 py-4">
                <section className="flex w-full max-w-md p-4">
                    <div className="h3 w-full flex">
                        <div className="w-full flex flex-col">
                            <div className="h-fit w-full gap-2 flex flex-col">
                                <div className="bg-scroll flex flex-col gap-2 h-[65vh] w-full overflow-y-auto">
                                    {
                                        messages.length === 0 ? (
                                            <p>Ninguém enviou mensagens nesse chat ainda 😒. Seja o primeiro!</p>
                                        ) : (
                                            [...messages].map((message, index) => (
                                                <ChatBubble
                                                    key={index}
                                                    showImage={true}
                                                    name={message.name}
                                                    username={message.username}
                                                    owner={message.host}
                                                    imageUrl={'https://media.resenha.app/u/'+message.hash+'.png'}
                                                    message={message.content}
                                                    timestamp={message.date.hour + ":" + message.date.minute}
                                                    sent={message.sent}
                                                />
                                            ))
                                        )
                                    }
                                    <div ref={messagesEndRef} />
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
