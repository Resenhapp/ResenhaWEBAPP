'use client'
import React, { useState } from 'react';

const PopUp = ({ title, icon, text, onActionClick, actionTitle, buttonColor, iconColor, showStatus }) => {

    const [isOpen, setIsOpen] = useState(showStatus);

    const handleClose = () => {
        setIsOpen(false);
    }

    const iconColorClass = iconColor === 'red' ? '#DA3535' : buttonColor === 'orange' ? '#E45D23' :
        buttonColor === 'yellow' ? '#EFB520' : buttonColor === 'green' ? '#80CC1F' : buttonColor === 'blue' ? '#0085FF' :
            buttonColor === 'purple' ? '#8E00FF' : '#8E00FF';

    const getIcon = (icon) => {
        switch (icon) {
            case 'exclamation':
                return (<svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 3.25C10.7492 3.25 3.25 10.7492 3.25 20C3.25 29.2508 10.7492 36.75 20 36.75C29.2508 36.75 36.75 29.2508 36.75 20C36.75 10.7492 29.2508 3.25 20 3.25ZM0.75 20C0.75 9.36852 9.36852 0.75 20 0.75C30.6315 0.75 39.25 9.36852 39.25 20C39.25 30.6315 30.6315 39.25 20 39.25C9.36852 39.25 0.75 30.6315 0.75 20Z" fill={iconColorClass} />
                    <path d="M18.1154 11.9329C18.1154 10.8654 18.9592 10 20 10C21.0408 10 21.8846 10.8654 21.8846 11.9329V13.5503L21.166 22.4298C21.1157 23.0519 20.6087 23.5306 20 23.5306C19.3913 23.5306 18.8843 23.0519 18.834 22.4298L18.1154 13.5503V11.9329ZM18 27.9093C18 27.357 18.1923 26.8836 18.5769 26.4892C18.9872 26.0684 19.4615 25.858 20 25.858C20.5385 25.858 21 26.0684 21.3846 26.4892C21.7949 26.8836 22 27.357 22 27.9093C22 28.4878 21.7949 28.9875 21.3846 29.4083C21 29.8028 20.5385 30 20 30C19.4615 30 18.9872 29.8028 18.5769 29.4083C18.1923 28.9875 18 28.4878 18 27.9093Z" fill={iconColorClass} />
                </svg>
                );
            case 'question':
                return (<svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 3.25C10.7492 3.25 3.25 10.7492 3.25 20C3.25 29.2508 10.7492 36.75 20 36.75C29.2508 36.75 36.75 29.2508 36.75 20C36.75 10.7492 29.2508 3.25 20 3.25ZM0.75 20C0.75 9.36852 9.36852 0.75 20 0.75C30.6315 0.75 39.25 9.36852 39.25 20C39.25 30.6315 30.6315 39.25 20 39.25C9.36852 39.25 0.75 30.6315 0.75 20Z" fill={iconColorClass} />
                    <path d="M20.8367 22.5794C20.8367 23.2588 20.3017 23.8095 19.6417 23.8095H19.314C18.4731 23.8095 17.7913 23.1077 17.7913 22.2421V22.1032C17.7913 21.3889 17.8684 20.8598 18.0226 20.5159C18.2025 20.1455 18.588 19.6561 19.1791 19.0476L21.1451 17.0238C21.5563 16.5741 21.7619 15.9921 21.7619 15.2778C21.7619 14.5899 21.5434 14.0212 21.1066 13.5714C20.6954 13.1217 20.1428 12.8968 19.449 12.8968C18.7551 12.8968 18.1768 13.1217 17.7142 13.5714C17.6153 13.662 17.5258 13.7592 17.4456 13.863C16.9245 14.5384 16.2952 15.2778 15.4574 15.2778C14.5027 15.2778 13.7334 14.4041 14.088 13.4916C14.4057 12.6742 14.882 11.9866 15.517 11.4286C16.5963 10.4762 17.9455 10 19.5646 10C21.1837 10 22.4943 10.463 23.4966 11.3889C24.4989 12.2884 25 13.5317 25 15.119C25 16.2037 24.6916 17.1296 24.0748 17.8968C23.6893 18.4259 23.2011 18.9683 22.61 19.5238C21.9932 20.1058 21.5691 20.5423 21.3379 20.8333C21.0038 21.3095 20.8367 21.8915 20.8367 22.5794ZM17.2902 27.9365C17.2902 27.381 17.4958 26.9048 17.907 26.5079C18.3182 26.0847 18.8065 25.873 19.3719 25.873C19.9372 25.873 20.4255 26.0714 20.8367 26.4683C21.2479 26.8651 21.4535 27.3413 21.4535 27.8968C21.4535 28.4788 21.2479 28.9815 20.8367 29.4048C20.4512 29.8016 19.9758 30 19.4104 30C18.845 30 18.3439 29.8016 17.907 29.4048C17.4958 28.9815 17.2902 28.4921 17.2902 27.9365Z" fill={iconColorClass} />
                </svg>
                );
            case 'blocked':
                return (<svg width="80" height="80" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.25 2.5C9.99923 2.5 2.5 9.99923 2.5 19.25C2.5 28.5008 9.99923 36 19.25 36C28.5008 36 36 28.5008 36 19.25C36 9.99923 28.5008 2.5 19.25 2.5ZM0 19.25C0 8.61852 8.61852 0 19.25 0C29.8815 0 38.5 8.61852 38.5 19.25C38.5 29.8815 29.8815 38.5 19.25 38.5C8.61852 38.5 0 29.8815 0 19.25Z" fill={iconColorClass} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M25.364 25.364C21.8492 28.8787 16.1508 28.8787 12.636 25.364C9.12132 21.8492 9.12132 16.1508 12.636 12.636C16.1508 9.12132 21.8492 9.12132 25.364 12.636C28.8787 16.1508 28.8787 21.8492 25.364 25.364ZM12.9844 21.7954C13.2332 22.3309 13.9319 22.3934 14.3494 21.9759L21.9759 14.3494C22.3934 13.9319 22.3309 13.2332 21.7954 12.9844C19.3419 11.8445 16.3349 12.2867 14.3108 14.3108C12.2867 16.3349 11.8445 19.3419 12.9844 21.7954ZM23.6892 23.6892C21.6651 25.7133 18.6581 26.1555 16.2046 25.0156C15.6691 24.7668 15.6066 24.0681 16.0241 23.6506L23.6506 16.0241C24.0681 15.6066 24.7668 15.6691 25.0156 16.2046C26.1555 18.6581 25.7133 21.6651 23.6892 23.6892Z" fill={iconColorClass} />
                </svg>
                );
            default:
                return '';
        }
    }





    const buttonColorClass = buttonColor === 'purple' ? 'bg-purpleT3' : buttonColor === 'red' ? 'bg-redT3' : 'bg-grayT3';
    if (!isOpen) {
        return null;
    } else {
        return (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' />
                <div className='relative w-[90%] max-w-md mx-auto bg-whiteT1 rounded-2xl ring-1 ring-inset ring-whiteT2 shadow-lg z-50'>
                    <div className='h-fit p-4'>
                        <div className='w-full flex justify-center'>
                            {getIcon(icon)}
                        </div>
                        <h1 className='text-2xl font-bold text-center text-purpleT2 mt-4'>{title}</h1>
                        <p className='text-center text-purpleT3 mt-2'>{text}</p>
                    </div>
                    <div className='flex items-center justify-between p-4'>
                        <button className='px-4 py-4 text-purpleT2' onClick={handleClose}>Cancelar</button>
                        <button className={`px-12 py-4 rounded-lg text-white ${buttonColorClass}`} onClick={onActionClick}>{actionTitle}</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default PopUp;