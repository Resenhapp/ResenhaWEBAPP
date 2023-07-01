'use client'
import React from 'react';
import Vector from './Vector';

const MenuButton = ({ toggleMenu }) => {
    return (
        <button onClick={toggleMenu} className="bg-purpleT2 text-whiteT1 h-16 w-16 rounded-full flex justify-center ring-1 shadow-2xl ring-purpleT3 align-center items-center ">
            <Vector vectorname={'burguer01'} />
        </button>
    );
};

export default MenuButton;