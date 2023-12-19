import React from 'react';
import Image from 'next/image';
import Vector from './Vector';

const MyParty = ({ partyName, partyDate, partyHour, viewChat, partyCode, imageUrl, viewReceipt, partyPaid }) => {

    const h3Classes = 'text-[12px]';
    const baseFlexClasses = 'flex flex-row items-center gap-1';

    return (
        <div className='bg-purpleT1 h-fit w-full rounded-2xl p-2 flex flex-row ring-1 ring-inset ring-purpleT3'>
            <Image src={imageUrl} alt="" width={110} height={30} className="mr-2 rounded-xl object-cover h-28 w-28" />
            <div className='flex flex-col w-full'>
                <h1 className='text-xl font-bold'>
                    {partyName}
                </h1>
                <div className={baseFlexClasses}>
                    <Vector vectorname={'calendar04'} />
                    <p className={h3Classes}>{partyDate}, às {partyHour}</p>
                </div>
                <div className={baseFlexClasses}>
                    <Vector vectorname={partyPaid == 0 ? 'pending1' : partyPaid == 1 ? 'done1' : ''} />
                    <p className={h3Classes}>
                        {partyPaid == 0 ? 'Pagamento pendente' : partyPaid == 1 ? 'Pago' : ''}
                    </p>
                </div>
                {/* <div className={baseFlexClasses}>
                <Vector vectorname={'user04'} />
                    <p className={h3Classes}>{partyGuests} confirmados</p>
                </div> */}
                <div className={baseFlexClasses}>
                    <Vector vectorname={'qr01'} />
                    <p className={h3Classes}>{partyCode}</p>
                </div>
                <div className='w-full h-full flex flex-row justify-end items-end content-end'>
                    <button onClick={viewChat} className='bg-purpleT2 flex ring-purpleT3 mr-2 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'chat02'} />
                    </button>
                    <button onClick={viewReceipt} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'eye02'} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MyParty;