import React from 'react';

const ChatBubble = ({ imageUrl, message, timestamp, sent, showImage = true }) => {
    const bubbleStyle = sent ? 'bg-whiteT1 text-purpleT1 rounded-tr-sm rounded-l-lg rounded-br-lg' : 'rounded-tl-sm rounded-r-lg rounded-bl-lg bg-purpleT1 text-white';
    const timeStyle = sent ? 'text-grayT0' : 'text-purpleT3';
    const containerStyle = sent ? 'flex-row-reverse ml-8' : 'flex-row mr-8';
    return (
        <div className={`flex ${containerStyle} gap-1`}>
            {(showImage && !sent) && <img className=' w-8 h-8 rounded-full' src={imageUrl} alt='chat bubble' />}
            <div className={`min-w-0 ${bubbleStyle} px-2 py-1 flex flex-col max-w-full break-words`}>
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
