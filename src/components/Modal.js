import React from 'react';

const Modal = ({ children, show, close }) => {
    if (!show) return null;
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                padding: '40px',
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.7)',
                zIndex: 9999,

            }}
            onClick={close}
        >
            <div
                style={{
                }}
                className='bg-purpleT0 ring-2 ring-purpleT1 rounded-2xl p-4 max-w-[100%]'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
