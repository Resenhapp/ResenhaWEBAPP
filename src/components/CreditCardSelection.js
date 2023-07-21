import React, { useState, useCallback, useEffect } from 'react';

const CreditCardSelection = ({ ccFlag, ccName, ccFinal, ccUsage, ccType, startSelected = false, onCheck }) => {
    let cardFlag;
    const [isChecked, setChecked] = useState(startSelected);

    if (ccFlag === 1) {
        cardFlag = 'visa';
    } else if (ccFlag === 2) {
        cardFlag = 'mastercard';
    } else if (ccFlag === 3) {
        cardFlag = 'amex';
    } else if (ccFlag === 4) {
        cardFlag = 'discover';
    } else if (ccFlag === 5) {
        cardFlag = 'cirrus';
    } else if (ccFlag === 6) {
        cardFlag = 'jcb';
    } else if (ccFlag === 7) {
        cardFlag = 'maestro';
    } else if (ccFlag === 8) {
        cardFlag = 'dinersclub';
    } else if (ccFlag === 9) {
        cardFlag = 'elo';
    }
    useEffect(() => {
        setChecked(startSelected);
    }, [startSelected]);

    const handleOnClick = () => {
        if (onCheck) {
            const canToggle = onCheck(!isChecked);
            if (canToggle) {
                setChecked(!isChecked);
            }
        } else {
            setChecked(!isChecked);
        }
    };
    return (
        <div 
            onClick={handleOnClick} 
            className={`w-full items-center gap-2 p-2 ${isChecked ? 'bg-purpleT2' : 'bg-purpleT1'} ring-2 ring-inset ${isChecked ? 'ring-purpleT3' : 'ring-purpleT2'} rounded-2xl flex flex-row`}
        >
            <input 
                type='checkbox' 
                checked={isChecked} 
                onChange={handleOnClick} 
                className='ccCheckStyle' 
            />
            <img 
                className={`rounded-lg`} 
                src={`https://resenha.app/publico/recursos/imagens/ui/cc/${cardFlag}.png`} 
                alt='credit card selection'
            />
            <div>
                <p className='text-md font-bold'>
                    {ccName} {ccType}
                </p>
                <p className='text-[12px]'>
                    {ccUsage === 0 ?
                        `Você ainda não usou este cartão. Ele termina com os dígitos ${ccFinal}.`
                        :
                        `Você já usou esse cartão ${ccUsage} vez${ccUsage > 1 ? 'es' : ''}. Ele termina com os dígitos ${ccFinal}.`
                    }
                </p>
            </div>
        </div>
    )
}

export default CreditCardSelection;