'use client'
import React, { useState } from 'react';
import ProgressBar from '@/src/components/ProgressBar';
import Piece01 from './components/piece01';
import Piece02 from './components/piece02';
import Button from '@/src/components/Button';

export const metadata = {
    title: 'Resenha.app • Nova resenha',
    description: 'Venha fazer suas resenhas!',
};

export default function NewEvent() {
    const [progress, setProgress] = useState(1);

    const handleNextStep = () => {
        setProgress(progress + 1);
    };

    const renderPiece = () => {
        switch (progress) {
            case 1:
                return <Piece01 />;
            case 2:
                return <Piece02 />;

            default:
                return null;
        }
    };

    // Define the titles and subtitles based on the current step
    let title, subtitle;
    switch (progress) {
        case 1:
            title = 'Vamos criar uma resenha?';
            subtitle = 'Primeiro, comece dando um nome para a sua resenha e defina o lugar onde ela vai acontecer:';
            break;
        case 2:
            title = 'E quando vai ser?';
            subtitle = 'Agora, defina a <b>data</b> e o <b>horário</b> em que ela vai ocorrer:';
            break;
        case 3:
            title = 'E quem entra?';
            subtitle = 'Agora, defina a <b>quanto é para entrar</b> e o <b>limite máximo</b> de convidados:';
            break;
        default:
            title = '';
            subtitle = '';
            break;
    }

    return (
        <div className='flex flex-col justify-around w-screen h-screen'>
            <div className='w-full gap-4 align-center flex flex-col content-center py-8 px-4'>
                <h1 className='text-[49px] leading-[50px] scale-95 items-center font-bold text-center'>
                    {title}
                </h1>
                <p className='text-center leading-[30px] text-[23px]' dangerouslySetInnerHTML={{ __html: subtitle }}>
                </p>
            </div>
            <div className='flex flex-col h-full items-center justify-end px-4'>
                <section className='flex h-full content-center justify-between flex-col items-center w-full mt-8 max-w-md p-4'>
                    {renderPiece()}
                    <div className='flex flex-row justify-between w-full'>
                        {progress > 0 && (
                            <button className='py-4 px-8' onClick={() => setProgress(progress - 1)}>
                                Voltar
                            </button>
                        )}
                        <Button
                            label={'Próximo'}
                            action={handleNextStep}
                            icon={'arrow'}
                            iconSide='right'
                            height={1}
                            width={3}
                            textAlign='left'
                        />
                    </div>
                </section>
                <div className='pb-12 w-full'>
                    <ProgressBar barAmount={5} barDone={progress} />
                </div>
            </div>
        </div>
    );
}