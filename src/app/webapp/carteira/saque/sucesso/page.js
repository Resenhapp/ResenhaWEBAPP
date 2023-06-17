'use client'
import EditButton from '@/src/components/EditButton';
import NotificationsButton from '@/src/components/NotificationsButton';
import Notifications from '@/src/components/Notifications';
import MenuButton from '@/src/components/MenuButton';
import Menu from '@/src/components/Menu';
import React, { useState, useRef } from 'react';
import NumberDisplay from '@/src/components/NumberDisplay';
import Interest from '@/src/components/Interest';
import MoneyDisplay from '@/src/components/MoneyDisplay';
import Button from '@/src/components/Button';
import InputField from '@/src/components/InputField';
import MoneyInput from '@/src/components/MoneyInput';
export const metadata = {
    title: 'Resenha.app • Saque',
    description: 'Venha fazer suas resenhas!',
}

export default function Wallet() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const inputRef = useRef(null);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    const handleWithdraw = () => {
        const withdrawalAmount = parseFloat(inputRef.current.replace(',', '.'));
        const availableAmount = parseFloat(avaliableCash.replace(',', '.'));

        if (withdrawalAmount > availableAmount) {
            alert('Insufficient funds');
        } else if (withdrawalAmount < 50) {
            alert('The minimum withdrawal amount is 50');
        } else {
            alert(`The amount to withdraw is R$ ${inputRef.current}`);
        }
    };

    var accountName = 'João Davi Souza Nascimento';
    var bankName = 'Banco Inter';
    var accountNumber = '123.123.123-45';
    var avaliableCash = '1234,00';

    return (
        <div className='flex flex-col w-screen h-screen '>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Pronto!</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <div className='w-full h-fit bg-purpleT2 rounded-2xl ring-2 ring-inset ring-purpleT3 p-4'>
                                <h1 className='font-bold text-2xl'>Dados bancários</h1>
                                <h1 className=''><b>Conta: </b>{accountNumber}</h1>
                                <h1 className=''><b>Nome: </b>{accountName}</h1>
                                <h1 className=''><b>Banco: </b>{bankName}</h1>
                            </div>
                            <div className='w-full'>
                                <div className='w-full h-fit ring-inset ring-2 flex flex-row gap-2 ring-purpleT3 bg-purpleT2 rounded-2xl p-4 '>
                                    R$
                                    <MoneyInput ref={inputRef} />
                                </div>
                                <p className='text-whiteT1 w-full text-left text-sm p-1'>{'Valor disponível: ' + avaliableCash}</p>
                            </div>
                        </div>
                        <div>
                            <Button label={'Solicitar saque'} icon={'arrow'} action={handleWithdraw} iconSide='right' height={1} width={1} textAlign='left' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
