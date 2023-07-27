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

export default function Concierge() {
    const [content, setContent] = useState('Scanner');
    
    const mount = (content) => {
        switch(content) {
            case "Scanner":
                return <Scanner typeCode={callTypeCode} scanResult={setContent}/>;
            case "TypeCode":
                return <TypeCode useCamera={callUseCamera} codeResponse={setContent}/>;
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
