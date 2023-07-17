import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            <h2>
                <button type="button" className="flex items-center justify-between
                 text-purpleT2 w-full p-5 font-medium text-left rounded-2xl " onClick={toggleOpen}>
                    <span>{title}</span>
                    <svg className={`w-6 h-6 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </h2>
            {isOpen && (
                <div className="px-5 pb-5 text-blackT1">
                    {content}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;