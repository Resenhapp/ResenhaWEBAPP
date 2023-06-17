'use client'
import NotificationsButton from '@/src/components/NotificationsButton';
import Notifications from '@/src/components/Notifications';
import MenuButton from '@/src/components/MenuButton';
import Menu from '@/src/components/Menu';
import React, { useState, useRef } from 'react';
import Button from '@/src/components/Button';
import MoneyInput from '@/src/components/MoneyInput';
import WithdrawError from '@/src/components/WithdrawError';

export const metadata = {
    title: 'Resenha.app • Saque',
    description: 'Venha fazer suas resenhas!',
}

export default function Wallet() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const inputRef = useRef(null);
    const [errorContent, setErrorContent] = useState(null);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleNotifications = () => setNotificationsOpen(!isNotificationsOpen);

    var avaliableCash = '1234,00';

    const [withdrawalAmount, setWithdrawalAmount] = useState(0);

    const handleWithdraw = () => {
        const availableAmount = parseFloat(avaliableCash.replace(',', '.'));
        if (withdrawalAmount < 50) {
            setErrorContent(null);
            setTimeout(() => setErrorContent('O valor mínimo de saque é de R$ 50,00.'), 0);
        } else if (withdrawalAmount > availableAmount) {
            setErrorContent(null);
            setTimeout(() => setErrorContent('Saldo insuficiente.'), 0);
        } else {
            setErrorContent(null); // Clear the error message when the withdraw is valid
            alert(`Você está sacando: R$ ${withdrawalAmount}`);
        }
    };


    var accountName = 'João Davi Souza Nascimento';
    var bankName = 'Banco Inter';
    var accountNumber = '123.123.123-45';

    const isWithdrawalValid = withdrawalAmount >= 50 && withdrawalAmount <= parseFloat(avaliableCash.replace(',', '.'));

    return (
        <div className='flex flex-col w-screen h-screen '>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Saque</h1>
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
                                <div>
                                <h1 className='w-full p-1 text-sm'>Digite abaixo o valor que você deseja sacar:</h1>
                                </div>
                                <div className='w-full h-fit ring-inset ring-2 flex flex-row gap-2 ring-purpleT3 bg-purpleT2 rounded-2xl p-4 '>
                                    R$<MoneyInput ref={inputRef} onChange={(val) => setWithdrawalAmount(parseFloat(val.replace('.', '').replace(',', '.')))} />
                                </div>
                                <p className='text-whiteT1 w-full text-left text-sm p-1'>{'Valor disponível: ' + avaliableCash}</p>
                            </div>
                        </div>
                        <div>
                            <Button label={'Solicitar saque'} icon={'arrow'} action={handleWithdraw} iconSide='right' height={1} width={1} textAlign='left' active={isWithdrawalValid} />
                            {errorContent && <WithdrawError errorContent={errorContent} key={new Date().getTime()} />} {/* Error message will only be displayed if errorContent is not null */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
