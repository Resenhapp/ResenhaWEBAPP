'use client'

import React, { useState } from 'react';
import Vector from '@/src/components/Vector';
import Link from 'next/link';
import Scanner from './pieces/scanner';
import TypeCode from './pieces/code';
import Granted from './pieces/granted';
import Denied from './pieces/denied';
import Used from './pieces/used';
import Help from './pieces/help';
import Cookies from 'js-cookie';

export default function Concierge() {
    const [content, setContent] = useState('Scanner');

    var concierge = Cookies.get('concierge');

    if (!concierge && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        concierge = urlParams.get('t');

        if (concierge) {
            Cookies.set('concierge', concierge);
        }

        // else {
        //     returnToHome("Help");
        // }
    }

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

    const tryToAllow = async (scannedCode) => {
        try {
            const response = await makeRequest(process.env.NEXT_PUBLIC_API_URL, {
                request: 'tryToAllowGuest',
                token: concierge,
                code: scannedCode
            });

            if (response.status == "success") {
                if (response.access == 'granted') {
                    // soundx.play();
                    // beep.play();
                    setContent('Granted');
                }

                else if (response.access == 'bill') {
                    // soundx.play();
                    // beep.play();
                    setContent('Cash');
                }
            }

            else {
                if (response.error == 'used') {
                    setContent('Used');
                }

                setContent('Denied');
            }
        } 
        
        catch (error) {
            console.error(error);
        }
    }
    
    const mount = (content) => {
        switch(content) {
            case "Scanner":
                return <Scanner typeCode={callTypeCode} tryToAllow={tryToAllow}/>;
            case "TypeCode":
                return <TypeCode useCamera={callUseCamera} codeResponse={setContent} tryToAllow={tryToAllow}/>;
            case "Granted":
                return <Granted returnToHome={setContent}/>
            case "Denied":
                return <Denied returnToHome={setContent}/>
            case "Used":
                return <Used returnToHome={setContent}/>
            case "Help":
                return <Help returnToHome={setContent}/>
            default:
                return null;
        }
    }

    const callTypeCode = () => {
        setContent('TypeCode');
    }

    const callUseCamera = () => {
        setContent('Scanner');
    }

    return (
        <div className='w-screen h-screen bg-blackT1'>
            <div className='z-[200] p-4 flex pt-8 flex-col justify-center content-center items-center'>
                <Vector vectorname={'logo'} />
                {mount(content)}
                {content !== "Help" && (
                  <div className='flex flex-row gap-2 mt-8 z-[4]'>
                    <p className=''>Precisa de ajuda? </p><p className='font-bold' onClick={() => setContent("Help")}>Toque aqui</p>
                  </div>
                )}
            </div>
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-0 top-[-50]' />
            <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect_w fixed z-[1] left-[220px] top-[256px]' />
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-[-50px] top-[656px]' />
        </div>
    );
}
