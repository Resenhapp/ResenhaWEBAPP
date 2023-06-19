import React from 'react';

const PopUp = ({ title, icon, text, onActionClick }) => {

    const handleClose = () => {
        // Handle the close action
    }

    const getIconPath = (icon) => {
        switch (icon) {
            case 'icon1':
                return '';
            case 'icon2':
                return '';
            case 'icon3':
                return '';
            default:
                return '';
        }
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' />
            <div className='relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg z-50 m-4'>
                <div className='h-64'>
                    <svg className='w-12 h-12 mx-auto' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                        <path d={getIconPath(icon)} />
                    </svg>
                    <h1 className='text-2xl font-bold text-center mt-4'>{title}</h1>
                    <p className='text-center mt-2'>{text}</p>
                </div>
                <div className='flex items-center justify-between p-4'>
                    <button className='px-4 py-2 rounded text-white bg-red-500' onClick={handleClose}>Close</button>
                    <button className='px-4 py-2 rounded text-white bg-blue-500' onClick={onActionClick}>Action</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp;
