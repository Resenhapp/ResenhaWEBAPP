import React from 'react';
import Vector from './Vector';

const Notification = ({ title, content }) => {
    function convertTextToLink(content, linkBaseUrl) {
        const regex = /@(\w+)/g;
      
        const result = content.replace(regex, `<a href="${linkBaseUrl}?u=$1">@$1</a>`);
      
        return result;
    }

    const formattedContent = convertTextToLink(content, "/perfil");

    return (
        <div className='w-full h-fit justify-between flex flex-row bg-purpleT1 p-2 rounded-xl ring-1 ring-inset ring-purpleT3'>
            <div className='w-full'>
                <h1 className='text-lg font-bold'>{title}</h1>
                <p className='text-sm font-thin' dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
        </div>
    );
};

export default Notification;