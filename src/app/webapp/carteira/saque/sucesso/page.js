'use client'
import React from 'react';
import Button from '@/src/components/Button';
import Vector from '@/src/components/Vector';
import PageHeader from '@/src/components/PageHeader';

export default function WithdrawSuccess() {
    let urlParams = null;
    let withdrawValue = '';
    let formattedWithdrawValue = '';

    if (typeof window !== 'undefined') {
        urlParams = new URLSearchParams(window.location.search);
        withdrawValue = urlParams.get('a');
    }

    if (withdrawValue) {
        formattedWithdrawValue = parseFloat(withdrawValue).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    } else {
        if (typeof window !== 'undefined') {
            window.location.href = '/webapp/carteira/';
        }
    }

    const handleNavigation = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/webapp/carteira/';
        }
    };

    return (
        <div className='flex flex-col w-screen h-screen '>
            <PageHeader pageTitle={'Saque solicitado'} isBack={true} checker={() => { null }} />
            <div className="flex flex-col justify-around h-full px-4">
                <section className="flex flex-col w-full max-w-md p-4 justify-around h-full">
                        <div className='w-full flex flex-col items-center gap-4'>
                            <Vector vectorname={'clock02'} />
                            <h1 className='text-2xl text-center w-full font-bold'>Saque solicitado</h1>
                            <p className='text-center w-2/3'>Você receberá o seu saque em até um dia útil.</p>
                            <hr className='bg-purpleT3 ring-0 w-full rounded-full' />
                            <div>
                                <p className='text-center'>Valor solicitado:</p>
                                <p className='text-3xl font-bold'>{formattedWithdrawValue}</p>
                            </div>
                        </div>
                        <div>
                            <Button label={'Concluir!'} icon={'check'} action={handleNavigation} iconSide='right' height={1} width={1} textAlign='center' />
                        </div>
                </section>
            </div>
        </div>
    )
}
