import InputField from '@/src/components/InputField';
import OptionsList from '@/src/components/OptionsList';
import AmountSelector from '@/src/components/AmountSelector';
import { useState, useEffect } from 'react';
import Toggle from '@/src/components/Toggle';

export default function Info({ setSelectionAmout, setPaymentMethod, setIsFilled, setCustomerName, setCustomerEmail, setCustomerIsEighteen, getPartyName, getPartyPrice, canBeUnderaged }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ticketsAmount, setTicketsAmount] = useState(1);
    const [isEighteen, setIsEighteen] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const handleNameFieldChange = (event) => {
        const value = event.target.value;
        setName(value);
        setCustomerName(value);
    };

    const handleEmailFieldChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setCustomerEmail(value);
        validateEmail(value);
    }
    
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailValid(emailRegex.test(email));
    }
    

    const handleTicketsUpdate = (value) => {
        setTicketsAmount(value);
        setSelectionAmout(value);
    }

    const isCustomerEighteen = (value) => {
        setCustomerIsEighteen(value);
        setIsEighteen(value)
    }

    const options = ['Pix', 'Cartão', 'Dinheiro'];
    const [method, setMethod] = useState('');
    const handleSelectChange = (event) => {
        setMethod(event.target.value);
        setPaymentMethod(event.target.value);
    };

    var newPartyPrice = getPartyPrice*ticketsAmount;

    useEffect(() => {
        if (name && emailValid && ticketsAmount && method) {
            if (canBeUnderaged || (!canBeUnderaged && isEighteen)) {
                setIsFilled(true);
            } else {
                setIsFilled(false);
            }
        } else {
            setIsFilled(false);
        }
    }, [name, emailValid, ticketsAmount, method, isEighteen, canBeUnderaged]);
    

    return (
        <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col w-full">
                    <div className='bg-purpleT2 items-center justify-center align-center flex flex-col ring-1 p-2 ring-inset ring-purpleT3 rounded-2xl'>
                        <h2 className="text-xl text-whiteT1 text-left font-bold">Você está comprando:</h2>
                        <div className='flex flex-row'>
                            <div>
                                <p className="text-2md text-whiteT1 text-left font-normal">{getPartyName}</p>
                            </div>
                            <div className='flex-row flex gap-2 bg-purpleT1 h-fit rounded-2xl py-1 px-3 ml-4 ring-inset ring-1 ring-purpleT3'>
                                <p className="text-sm text-whiteT1 text-left font-normal">{ticketsAmount}x</p>
                                <p className="text-sm text-whiteT1 text-left font-bold">R$ {newPartyPrice   }</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 mb-12 gap-4 w-full">
                        <InputField Required={true} action={handleNameFieldChange} placeholder="Nome" showIcon={true} Icon="person" value={name} />
                        <InputField Required={true} action={handleEmailFieldChange} placeholder="E-mail" showIcon={true} Icon="mail" value={email} />
                        <div className="flex bg-whiteT1 ring-1 px-4 ring-whiteT2 ring-inset rounded-2xl h-14 flex-row items-center justify-between">
                            <h2 className="text-purpleT2 text-2md font-normal">Entradas</h2>
                            <AmountSelector className="text-purpleT1" setTicketsAmount={handleTicketsUpdate} />
                        </div>
                        <Toggle labelText={'Sou maior de 18 anos'} showLabel={true} startToggled={isEighteen} onToggle={isCustomerEighteen} />
                        <OptionsList showIcon={true} Icon="coin" options={options} action={handleSelectChange} placeholder='Forma de pagamento' />
                    </div>
                </div>
            </section>
        </div>
    )
}