import InputField from '@/src/components/InputField';
import Button from '@/src/components/Button';
import Link from 'next/link';
import OptionsList from '@/src/components/OptionsList';
import Back from '@/src/components/Back';
import AmountSelector from '@/src/components/AmountSelector';
import Checker from '@/src/components/Checker';
import { useState } from 'react';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Loading from '@/src/components/Loading';
import Image from 'next/image';

export default function Confirmation({setIsFilled}) {

    return (
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <section className="flex flex-col items-center w-full max-w-md p-4">
                        <div className="flex flex-col mb-0 w-full">
                            <div>
                                <h2 className="text-2xl text-whiteT1 text-center font-bold">Pronto!</h2>
                                <p className="text-sm text-whiteT1 text-center font-thin mb-2">Utilize o código abaixo no dia da resenha para entrar! <b className='font-bold'>Ele também será enviado ao e-mail informado anteriormente</b>.</p>
                            </div>
                            <div className='flex flex-col rounded-2xl ring-1 ring-whiteT2 bg-white p-6' id='ticket'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <div className='flex items-center rounded-md ring-1 w-fit h-fit ring-whiteT2 justify-center'>
                                            <Image
                                                src={'https://media.resenha.app/r/37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f.png'}
                                                width={50}
                                                height={50}
                                                alt="QR Code"
                                                className="z-1 rounded-md"
                                            />
                                        </div>
                                        <div className='ml-3'>
                                            <h1 className='font-bold text-xl h-fit text-blackT1'>Resenha dos manos</h1>
                                            <h3 className='font-bold text-sm h-fit text-blackT1'>Por: Vitor Prates</h3>
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-4 mt-4'>
                                        <div className='flex flex-col'>
                                            <div>
                                                <h1 className='font-bold text-sm text-grayT0'>Data:</h1>
                                                <h3 className='font-bold text-blackT1'>20 de Maio</h3>
                                            </div>
                                            <div>
                                                <h1 className='font-bold text-sm text-grayT0'>Horário:</h1>
                                                <h3 className='font-bold text-blackT1'>às 20:00h</h3>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div>
                                                <h1 className='font-bold text-sm text-grayT0'>Endereço:</h1>
                                                <h3 className='font-bold text-blackT1'>Rua Ramiro Barcelos 1450</h3>
                                            </div>
                                            <div>
                                                <h1 className='font-bold text-sm text-grayT0'>Código:</h1>
                                                <h3 className='font-bold text-blackT1'>5129</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row mt-6 justify-between h-[0px] rounded-full outline-dotted bg-whiteT2' />
                                <div className='flex items-center mt-4 justify-center'>
                                    <Image
                                        src={'https://chart.googleapis.com/chart?chs=240x240&cht=qr&chl=Hello+world&chld=L|1&choe=UTF-8'}
                                        width={240}
                                        height={240}
                                        alt="QR Code"
                                        className="z-1"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col mb-4 mt-4 w-full">
                            <Button label={'Salvar'} icon={'arrowDown'} action={() => { }} iconSide='right' height={1} width={1} textAlign='center' />
                        </div>
                        <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                            <h1 className="font-regular">
                                <a href="https://resenha.app"><b>Saiba mais</b></a>
                            </h1>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}