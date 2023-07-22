'use client'
import React, { useState, useEffect, useRef } from 'react';
import Vector from '@/src/components/Vector';
import QrScanner from 'qr-scanner';
import QrScannerWorkerPath from 'qr-scanner/qr-scanner-worker.min.js';

QrScanner.WORKER_PATH = QrScannerWorkerPath;

export default function Scanner() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [qrCode, setQrCode] = useState(null);

    useEffect(() => {
        if (!videoRef.current) return;
        const qrScanner = new QrScanner(videoRef.current, result => setQrCode(result));

        qrScanner.start();

        return () => {
            qrScanner.stop();
        }
    }, []);

    return(
        <div className='w-screen h-screen bg-blackT1'>
            <div className='z-[2] p-4 flex flex-col justify-center content-center items-center'>
                <Vector vectorname={'logo'}/>
                <h1>Escaneie o código</h1>
                <div className='z-[2]'>
                    <video ref={videoRef} />
                    {qrCode && <div>QR Code: {qrCode}</div>}
                </div>
            </div>
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-0 top-[-50]' />
            <div className='w-80 h-80 animate-up-down bg-transparent rounded-full moreffect_w fixed z-[1] left-[220px] top-[256px]' />
            <div className='w-80 h-80 animate-left-right bg-transparent rounded-full moreffect_w fixed z-[1] left-[-50px] top-[656px]' />
        </div>
    );
}
