'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/src/components/PageHeader';
import ChatInput from '@/src/components/ChatInput';
import ChatBubble from '@/src/components/ChatBubble';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from "@/src/components/Loading";

export default function Chat() {
    let urlParams = null;
    let groupChat = '';
    let dualChat = '';

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const groupChat = urlParams.get('r');
        const dualChat = urlParams.get('u');
    }

    let chatType = '';
    if (groupChat != null) {
        chatType = 'group';
    } else {
        chatType = 'dm';
    }

    let chatCode = '';
    if (groupChat != null) {
        chatCode = groupChat;
    } else {
        chatCode = dualChat;
    }


    var u = Cookies.get('username');
    var validator = Cookies.get('validator');

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const qs = require('qs');

    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/webapp/${pageToGo}`;
        }
    };

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
                request: 'getMessages',
                username: u,
                validator: validator,
                code: chatCode,
                type: chatType,
            });

            if (response && Array.isArray(response.messages)) {
                setMessages(response.messages);
            } else {
                console.error('Response does not contain an array of messages:', response);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
        console.log(messages)
    };


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center content-center items-center">
                <Loading />
            </div>
        );
    }

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
                                    {[...messages].reverse().map((message, index) => (
                                        <ChatBubble
                                            key={index}
                                            showImage={false}
                                            imageUrl={message.imageUrl}
                                            message={message.content}
                                            timestamp={message.date.hour}
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
