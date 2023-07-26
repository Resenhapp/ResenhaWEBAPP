'use client'
import React, { useState } from 'react';
import Vector from '@/src/components/Vector';
import Link from 'next/link';
import Scanner from './pieces/scanner';
import TypeCode from './pieces/code';

export default function Concierge() {
    const [content, setContent] = useState('Scanner');

    const mount = (content) => {
        switch(content) {
            case "Scanner":
                return <Scanner typeCode={callTypeCode}/>;
            case "TypeCode":
                return <TypeCode useCamera={callUseCamera}/>;
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
                <div className='flex flex-row gap-2 mt-8 z-[4]'>
                    <p className=''>Precisa de ajuda? </p><Link className='font-bold' href={'./ajuda/'}>Toque aqui</Link>
                </div>
            </div>
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-0 top-[-50]' />
            <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect_w fixed z-[1] left-[220px] top-[256px]' />
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-[-50px] top-[656px]' />
        </div>
    );
}