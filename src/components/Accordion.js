import React from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ data }) => {
    return (
        <div className='w-full bg-whiteT1 rounded-2xl' id="accordion-collapse" data-accordion="collapse">
            {data.map((item, index) => (
                <AccordionItem key={index} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

export default Accordion;