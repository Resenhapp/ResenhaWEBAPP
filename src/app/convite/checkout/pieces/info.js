import InputField from '@/src/components/InputField';
import OptionsList from '@/src/components/OptionsList';
import AmountSelector from '@/src/components/AmountSelector';
import Toggle from '@/src/components/Toggle';

import { useState, useEffect } from 'react';
import Vector from '@/src/components/Vector';

export default function Info({ setSelectionAmout, setPaymentMethod, loadCoupon, loadName, loadEmail, setIsFilled, setCustomerName, setCustomerEmail, setCustomerCoupon, setCustomerIsEighteen, getPartyName, getPartyPrice, canBeUnderaged }) {
    const [name, setName] = useState(loadName);
    const [email, setEmail] = useState(loadEmail);
    const [ticketsAmount, setTicketsAmount] = useState(1);
    const [isEighteen, setIsEighteen] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const [newPartyPrice, setNewPartyPrice] = useState('');
    const [haveCoupon, setHaveCoupon] = useState(false);
    const [coupon, setCoupon] = useState(loadCoupon);
    const [validCoupon, setValidCoupon] = useState(null);
    const [loadingCoupon, setLoadingCoupon] = useState(false);
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

    const handleCouponFieldChange = (event) => {
        const value = event.target.value;
        setCoupon(value);
        setCustomerCoupon(value);
    }

    const handleCouponChange = (event) => {
        setHaveCoupon(event.target.checked);
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

    const exampleCoupon = 'FESTA10';

    useEffect(() => {
        let timeoutId;
      
        const checkCouponValidity = async () => {
          try {
            setLoadingCoupon(true);
            // Simulate an asynchronous operation (coupon validation)
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            if (coupon === exampleCoupon) {
              setValidCoupon(true);
            } else {
              setValidCoupon(false);
            }
          } finally {
            setLoadingCoupon(false);
          }
        };
      
        if (haveCoupon && (coupon !== '' || coupon !== null)) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(checkCouponValidity, 50);
        }
      
        return () => {
          clearTimeout(timeoutId);
        };
      }, [coupon, haveCoupon]);
      

    useEffect(() => {
        const isValid = name && emailValid && ticketsAmount && method && (canBeUnderaged || isEighteen);

        const numericPart = parseFloat(getPartyPrice.replace(/[^0-9,]/g, '').replace(',', '.'));

        let discount = 0;
        if (ticketsAmount > 1 && ticketsAmount <= 4) {
            discount = 0.25;
        } else if (ticketsAmount >= 5 && ticketsAmount <= 10) {
            discount = 0.35;
        }

        let discountedPrice = numericPart * ticketsAmount * (1 - discount);
        discountedPrice = discountedPrice.toLocaleString('pt-BR');

        setNewPartyPrice(discountedPrice);

        setIsFilled(isValid);
    }, [name, emailValid, ticketsAmount, method, isEighteen, canBeUnderaged, getPartyPrice]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <section className="flex flex-col items-center w-full max-w-md">
                <div className="flex flex-col w-full">
                    <div className='bg-purpleT2 items-center justify-center align-center flex flex-col ring-1 p-2 ring-inset ring-purpleT3 rounded-2xl'>
                        <h2 className="text-xl text-whiteT1 text-left font-bold">Você está comprando:</h2>
                        <div className='flex flex-row'>
                            <div>
                                <p className="text-2md text-whiteT1 text-left font-normal">{getPartyName}</p>
                            </div>
                            <div className='flex-row flex gap-2 bg-purpleT1 h-fit rounded-2xl py-1 px-3 ml-4 ring-inset ring-1 ring-purpleT3'>
                                <p className="text-sm text-whiteT1 text-left font-normal">{ticketsAmount} •</p>
                                <div>
                                    <p className="text-sm text-whiteT1 text-left font-bold">R$ {newPartyPrice}</p>
                                    {ticketsAmount > 1 && (() => {
                                        const numericPart = parseFloat(getPartyPrice.replace(/[^0-9,]/g, '').replace(',', '.'));
                                        return (
                                            <>
                                                <p className="text-[12px] text-purpleT4 text-right font-bold line-through">
                                                    R$ {numericPart * ticketsAmount}
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>
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
                        {/* <Toggle labelText={'Tenho um cupom de desconto'} showLabel={true} startToggled={haveCoupon} onToggle={setHaveCoupon} /> */}

                        {haveCoupon &&
                            <div>
                                <InputField Required={true} action={handleCouponFieldChange} placeholder="Cupom de desconto" showIcon={true} Icon="ticket" value={coupon} />
                                {loadingCoupon &&
                                    <div className="flex flex-row items-center justify-end">
                                        <div className="animate-spin">
                                            <Vector vectorname={"loading01"} />
                                        </div>
                                            <p className="text-whiteT1 text-sm">Validando cupom... </p>
                                    </div>
                                }
                                {validCoupon === false && !loadingCoupon && <p className="text-red-500 text-sm w-full text-right">Cupom inválido!</p>}
                                {validCoupon === true && !loadingCoupon && <p className="text-green-500 text-sm w-full text-right">Cupom válido!</p>}
                            </div>
                        }
                        <OptionsList showIcon={true} Icon="coin" options={options} action={handleSelectChange} placeholder='Forma de pagamento' />
                    </div>
                </div>
            </section>
        </div>
    )
}
