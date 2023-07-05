import React, { useState, useEffect } from 'react';

const SignatureSelection = ({ signatureType, startSelected = false, onCheck }) => {
    let signatureName;
    let signatureFeatures;
    let signatureImage;

    if (signatureType === 1) {
        signatureName = 'Grátis';
        signatureFeatures = ['Participar de resenhas', 'Organizar resenhas'];
        signatureImage = 'free'; 
    } else if (signatureType === 2) {
        signatureName = 'V.I.P';
        signatureFeatures = ['Descontos em resenhas, Descontos em compras, '];
        signatureImage = 'vip'; 
    }

    const [isChecked, setChecked] = useState(startSelected);

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

    const containerStyle = (signatureType === 2 ? 
        `w-full items-center gap-2 p-2 ${isChecked ? 'bg-blackT1' : 'bg-blackT1'} ring-2 ring-inset ${isChecked ? 'ring-whiteT1' : 'ring-grayT0'} rounded-2xl flex flex-row` :
        `w-full items-center gap-2 p-2 ${isChecked ? 'bg-purpleT2' : 'bg-purpleT1'} ring-2 ring-inset ${isChecked ? 'ring-purpleT3' : 'ring-purpleT2'} rounded-2xl flex flex-row`);

    return (
        <div 
            onClick={handleOnClick} 
            className={containerStyle}
        >
            <input 
                type='checkbox' 
                checked={isChecked} 
                onChange={handleOnClick} 
                className='ccCheckStyle' 
            />
            <img 
                className={`rounded-lg ring-2 ring-whiteT1`} 
                src={`https://resenha.app/publico/recursos/imagens/ui/subscription/${signatureImage}.png`} 
            />
            <div>
                <p className='text-md font-bold'>
                    Plano {signatureName}
                </p>
                {signatureFeatures.map((feature, index) => (
                    <p className='text-[12px]' key={index}>
                        {feature}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default SignatureSelection;
