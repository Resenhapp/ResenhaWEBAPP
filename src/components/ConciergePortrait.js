import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const ConciergePortrait = ({ imgUrl, conciergeName, conciergeToken, relativeEvent, deleteAction, editAction, copyAction }) => {
    const baseFlexClasses = 'flex flex-row items-center gap-1';
    const h3Classes = 'text-[12px]';

    return (
        <div className='bg-purpleT2 rounded-2xl p-3 flex flex-row ring-1 ring-inset ring-purpleT4'>
            <Image src={imgUrl} alt="" width={110} height={30} className="mr-2 rounded-lg object-cover h-28 w-28" />
            <div className='flex flex-col w-full justify-around'>
                <h1 className='text-xl font-bold'>{conciergeName}</h1>
                <div className={baseFlexClasses}>
                    <Vector vectorname={'thunder03'} />
                    <h3 className={h3Classes}>
                        {relativeEvent}
                    </h3>
                </div>
                <div className={baseFlexClasses}>
                    <Vector vectorname={'token01'} />
                    <h3 className={h3Classes}>
                        {conciergeToken}
                    </h3>
                </div>
                <div className='flex flex-row justify-between w-full mt-4'>
                    <div className='gap-2 flex w-fit'>
                        <button onClick={editAction} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'edit02'} />
                        </button>
                        <button onClick={copyAction} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'copy01'} />
                        </button>
                    </div>
                    <button onClick={deleteAction} className='bg-redT2 flex ring-redT4 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'trash01'} />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ConciergePortrait;