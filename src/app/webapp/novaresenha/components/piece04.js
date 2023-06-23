import React from 'react';
import Vector from '@/src/components/Vector';

const Piece04 = () => {
    return (
        <div className="w-full flex flex-col h-fit gap-3">
            <div className="h-fit ring-2 p-3 ring-inset ring-purpleT4 bg-purpleT1 rounded-2xl">
                <textarea
                    className={`w-full h-32 resize-none bg-transparent sm:text-sm outline-none text-whiteT1 placeholder-purpleT5`}
                    placeholder={'Exemplo: Vai ter beerpong e bebida liberada pra todo mundo, só não vai mijar no chão!'}
                />
            </div>
            <div className='flex flex-row gap-2'>
                <button className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-2 rounded-full ring-2 ring-inset ring-purpleT4">
                    <h1>Nova tag</h1>
                    <Vector vectorname={'plus02'} />
                </button>
                <div className="flex flex-row gap-1 items-center bg-purpleT2 w-fit px-3 py-2 rounded-full ring-2 ring-inset ring-purpleT4"><h1>Tag tal</h1></div>
            </div>
        </div>
    );
};

export default Piece04;