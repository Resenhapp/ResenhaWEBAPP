import React from 'react';

const Tag = ({tagname}) => {
    return (
        <div className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-2 rounded-full ring-2 ring-inset ring-purpleT4"><h1>{tagname}</h1></div>
    )
}

export default Tag;