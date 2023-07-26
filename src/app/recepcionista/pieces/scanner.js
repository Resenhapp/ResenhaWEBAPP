'use client'
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
export default function Scanner({typeCode, scanResult}) {
    const [data, setData] = useState('No result');

    const [code, setCode] = useState('');

    const tryToAllow = (scannedCode) => {
        console.log(scannedCode);
        if (scannedCode == '1') {
            scanResult('Granted');
        }
        else if (scannedCode == '2') {
            scanResult('Denied');
        }
        else if (scannedCode == '3') {
            scanResult('Used');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center content-center my-4'>
            <h1>Escaneie o código</h1>
            <div className='z-[2] items-center mt-4 content-center flex flex-col justify-center gap-4'>
                <div className='rounded-2xl' style={{ width: '290px', height: '290px', position: 'relative', overflow: 'hidden' }}>
                <QrReader
    constraints={{ facingMode: 'environment' }}
    className='scale-[2]'
    onResult={(result, error) => {
        if (!!result) {
            setData(result?.text);
            tryToAllow(result?.text);
        }
        if (!!error) {
            console.info(error);
        }
    }}
/>
                </div>
                <p className='text-center w-[80%]'>Caso a câmera não esteja funcionando, toque no botão abaixo para digitar o código:</p>
                <button onClick={typeCode} className='px-8 py-2 bg-whiteT1 rounded-xl text-purpleT0 font-normal text-xl'>Digitar código</button>
            </div>
            <div className='items-center flex flex-col mt-12'>
                <p className='text-3xl font-bold'>Atenção:</p>
                <p className='text-center w-[90%]'>Sempre siga as instruções do hospedeiro para garantir a segurança e a melhor experiência para os visitantes.</p>
            </div>
        </div>
    )
}
