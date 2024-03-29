'use client'

import React from 'react';
import Button from '@/src/components/Button';

const Menu = ({ isOpen, toggleMenu, userData }) => {
    const handleNavigation = (pageToGo) => {
        if (typeof window !== 'undefined') {
            window.location.href = `/${pageToGo}`;
        }
    };

    var { username } = userData;

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-purpleT0 z-10 transition-transform duration-300 ease-in-out overflow-auto xl:max-w-[480px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} >
            <div className="flex flex-row justify-between items-center w-full mt-0 px-6 pt-20">
                <h1 className='text-2xl px-4 text-purpleT5 font-light'>Menu</h1>
                <button onClick={toggleMenu} className="p-4">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6M6 6L1 11M6 6L11 11M6 6L11 1" stroke="#F1F1F1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4 gap-4"></section>
            <div className="flex flex-col items-center justify-center px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 mt-4 flex flex-col'>
                                <Button label={'Feed'} icon={'lit'} action={() => handleNavigation('feed')} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Resenhas'} icon={'thunder'} action={() => handleNavigation('resenhas')} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Carteira'} icon={'wallet'} action={() => handleNavigation('carteira')} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Ajuda'} icon={'question'} action={() => handleNavigation('ajuda')} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Configurações'} icon={'gear'} action={() => handleNavigation('configuracoes')} iconSide='left' height={1} width={1} textAlign='left' />
                                <Button label={'Perfil'} icon={'user'} action={() => handleNavigation(`perfil?u=${username}`)} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                            <div className='mt-10'>
                                <Button label={'Nova resenha'} icon={'plus'} action={() => handleNavigation('resenhas/criar/')} iconSide='left' height={1} width={1} textAlign='left' />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Menu;
