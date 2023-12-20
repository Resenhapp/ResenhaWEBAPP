import React, { useState, useEffect } from 'react';
import Vector from './Vector';

const ChatBubble = ({name, username, owner, imageUrl, message, timestamp: incomingTimestamp, sent, showImage = true }) => {
    const [timestamp, setTimestamp] = useState('Enviando...');

    useEffect(() => {
        if (incomingTimestamp !== 'undefined:undefined') {
            setTimestamp(incomingTimestamp);
        }
    }, [incomingTimestamp]);

    const bubbleStyle = sent ? 'bg-whiteT1 text-purpleT1 rounded-tr-sm rounded-l-lg rounded-br-lg' : 'rounded-tl-sm rounded-r-lg rounded-bl-lg bg-purpleT1 text-white';
    const timeStyle = sent ? 'text-grayT0' : 'text-purpleT3';
    const containerStyle = sent ? 'flex-row-reverse ml-8' : 'flex-row mr-8';

    return (
        <div className={`flex ${containerStyle} gap-1`}>
            {(showImage && !sent) && <div className='items-center flex flex-col'>{owner&&<span  className='absolute translate-y-[-10px]'><Vector vectorname={"crown01"} /></span>}<img className='w-6 h-6 rounded-full' src={imageUrl} alt='chat bubble' /></div>}
            <div className={`min-w-0 ${bubbleStyle} px-2 py-1 flex flex-col max-w-full break-words`}>
            {(showImage && !sent) && 
                <div onClick={()=>{window.location.href="https://resenha.app/perfil?u="+username}} className='flex flex-row items-center gap-1'>
                    <p className='text-[12px]'>{name}</p>
                    <p>·</p>
                    <p className='text-[12px] text-purpleT5'>@{username}</p>
                </div>
            }
                <p className='overflow-wrap break-word whitespace-pre-wrap'>
                    {message}
                </p>
                <p className={`text-end text-sm ${timeStyle}`}>
                    {timestamp}
                </p>
            </div>
        </div>
    )
}

export default ChatBubble;
