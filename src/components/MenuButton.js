'use client'
import React from 'react';

const MenuButton = ({ toggleMenu }) => {
    return (
        <button onClick={toggleMenu} className="bg-purpleT2 text-whiteT1 h-16 w-16 rounded-full flex justify-center ring-2 shadow-2xl ring-purpleT3 align-center items-center ">
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.928571C0 0.415736 0.393681 0 0.87931 0H16.1207C16.6063 0 17 0.415736 17 0.928571C17 1.44141 16.6063 1.85714 16.1207 1.85714H0.87931C0.393681 1.85714 0 1.44141 0 0.928571ZM0 6.5C0 5.98716 0.393681 5.57143 0.87931 5.57143H14.5C14.9856 5.57143 15.3793 5.98716 15.3793 6.5C15.3793 7.01284 14.9856 7.42857 14.5 7.42857H0.87931C0.393681 7.42857 0 7.01284 0 6.5ZM0 12.0714C0 11.5586 0.393681 11.1429 0.87931 11.1429H12.5C12.9856 11.1429 13.3793 11.5586 13.3793 12.0714C13.3793 12.5843 12.9856 13 12.5 13H0.87931C0.393681 13 0 12.5843 0 12.0714Z" fill="#D6A3FF" />
                </svg>
        </button>
    );
};

export default MenuButton;