import React, { useEffect } from 'react';
import Vector from './Vector';

const Loading = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/login';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="animate-ping">
            <Vector vectorname={'thunder02'} />
        </div>
    );
};

export default Loading;
