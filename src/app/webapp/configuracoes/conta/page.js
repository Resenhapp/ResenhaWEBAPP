'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Conta',
    description: 'Venha fazer suas resenhas!',
}

export default function Account() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div>
            
        </div>
    )

}