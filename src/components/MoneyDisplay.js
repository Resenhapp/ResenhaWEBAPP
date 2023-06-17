import React from 'react';

const MoneyDisplay = ({ amount, cashType }) => {
    const configMap = {
        'available': { bg: 'bg-purpleT2', ring: 'ring-purpleT3', title: 'Saldo disponível' },
        'processing': { bg: 'bg-orangeT1', ring: 'ring-orangeT3', title: 'Em processamento' },
        'secured': { bg: 'bg-redT1', ring: 'ring-redT3', title: 'Em seguro' },
        'requested': { bg: 'bg-blueT1', ring: 'ring-blueT3', title: 'Saque solicitado' },
    };

    const config = configMap[cashType] || configMap['available'];

    return (
        <div className={`w-full h-fit p-4 ${config.bg} ${config.ring} ring-2 ring-inset rounded-2xl flex flex-col justify-center items-center`}>
            <h3 className='text-sm font-bold'>{config.title}</h3>
            <h1 className='text-2xl font-normal'> {'R$ ' + amount}</h1>
        </div>
    )
}

export default MoneyDisplay;
