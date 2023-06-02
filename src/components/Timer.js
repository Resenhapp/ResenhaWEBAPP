'use client'
import React, { useEffect, useState } from 'react';

const Timer = ({ timeInMinutes = 10, text = "O seu tempo para pagar acaba em:" }) => {
    const timeInMilliseconds = timeInMinutes * 60 * 1000;
    const [remainingTime, setRemainingTime] = useState(timeInMilliseconds);
    const endTimeRef = React.useRef(Date.now() + timeInMilliseconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedRemainingTime = endTimeRef.current - Date.now();
            setRemainingTime(updatedRemainingTime <= 0 ? 0 : updatedRemainingTime);
        }, 200); // Check more frequently for a smoother countdown

        return () => clearInterval(intervalId); // cleanup on unmount
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            window.location.href = 'https://resenha.app/DGPcBwzI';
        }
    }, [remainingTime]);

    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    const totalDuration = timeInMilliseconds;
    const remainingDuration = Math.max(0, remainingTime);
    const fillWidth = `${(remainingDuration / totalDuration) * 100}%`;

    return (
        <div className=''>
            <p>{text}</p>
            <div id='timer-text' className='text-3xl font-bold'>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="timer-bar h-2 bg-purpleT3 rounded-full">
                <div className="timer-bar-fill h-2 bg-whiteT1 rounded-full" style={{ width: fillWidth }}></div>
            </div>
        </div>
    );
};

export default Timer;
