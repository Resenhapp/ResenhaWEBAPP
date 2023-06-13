import React from 'react';

const Menu = ({ label, icon }) => {
    let iconSvg;
    if (icon === 'plus') {
        iconSvg = (
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM16.3235 9.32353C16.3235 8.59256 15.7309 8 15 8C14.2691 8 13.6765 8.59256 13.6765 9.32353V13.2941C13.6765 13.7814 13.2814 14.1765 12.7941 14.1765H8.82353C8.09256 14.1765 7.5 14.7691 7.5 15.5C7.5 16.2309 8.09256 16.8235 8.82353 16.8235H12.7941C13.2814 16.8235 13.6765 17.2186 13.6765 17.7059V21.6765C13.6765 22.4074 14.2691 23 15 23C15.7309 23 16.3235 22.4074 16.3235 21.6765V17.7059C16.3235 17.2186 16.7186 16.8235 17.2059 16.8235H21.1765C21.9074 16.8235 22.5 16.2309 22.5 15.5C22.5 14.7691 21.9074 14.1765 21.1765 14.1765H17.2059C16.7186 14.1765 16.3235 13.7814 16.3235 13.2941V9.32353Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'arrow') {
        iconSvg = (
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM9.8125 14.3585C9.36377 14.3585 9 14.7223 9 15.171C9 15.6197 9.36377 15.9835 9.8125 15.9835H16.4729C17.3616 15.9835 17.8088 17.0562 17.1832 17.6874L14.9275 19.9636C14.6151 20.2788 14.6162 20.7872 14.93 21.101C15.2448 21.4158 15.7552 21.4158 16.07 21.101L21.2929 15.8781C21.6834 15.4876 21.6834 14.8544 21.2929 14.4639L16.0688 9.2398C15.7531 8.92405 15.2425 8.91955 14.9213 9.22968C14.5919 9.54764 14.5872 10.0739 14.9109 10.3977L17.1647 12.6514C17.7946 13.2814 17.3485 14.3585 16.4576 14.3585H9.8125Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'share') {
        iconSvg = (
            <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM20.5 10.8333C20.5 12.122 19.4255 13.1667 18.1 13.1667C17.7568 13.1667 17.4305 13.0966 17.1353 12.9705C16.725 12.7952 16.2414 12.7392 15.867 12.9818L13.8244 14.3057C13.4392 14.5554 13.3 15.041 13.3 15.5C13.3 15.9591 13.4392 16.4447 13.8244 16.6944L15.8669 18.0183C16.2413 18.2609 16.7249 18.2048 17.1352 18.0295C17.4304 17.9034 17.7568 17.8333 18.1 17.8333C19.4255 17.8333 20.5 18.878 20.5 20.1667C20.5 21.4553 19.4255 22.5 18.1 22.5C16.7745 22.5 15.7 21.4553 15.7 20.1667C15.7 19.7076 15.5608 19.222 15.1756 18.9724L13.133 17.6485C12.7587 17.4058 12.275 17.4619 11.8648 17.6372C11.5695 17.7633 11.2432 17.8333 10.9 17.8333C9.57452 17.8333 8.5 16.7887 8.5 15.5C8.5 14.2113 9.57452 13.1667 10.9 13.1667C11.2432 13.1667 11.5696 13.2367 11.8648 13.3629C12.2751 13.5382 12.7588 13.5943 13.1331 13.3516L15.1756 12.0278C15.5608 11.7781 15.7 11.2924 15.7 10.8333C15.7 9.54467 16.7745 8.5 18.1 8.5C19.4255 8.5 20.5 9.54467 20.5 10.8333Z" fill="#8E00FF" />
            </svg>
        );
    }

    let labelClass = 'flex-1 text-center';
    if (icon !== '') {
        labelClass = 'flex-1 ml-7 text-center';
    }
    else {
        labelClass = 'flex-1 text-center';
    }
    return (
        <button className="bg-whiteT1 shadow-lg shadow-[#ffffff26] text-purpleT3 hover:bg-white h-16 font-bold py-2 px-4 rounded-full flex justify-center items-center w-full max-w-[500px]">
            <span className={labelClass}>{label}</span>
            {iconSvg && <div className="ml-0">{iconSvg}</div>}
        </button>
    );    
};

export default Menu;
