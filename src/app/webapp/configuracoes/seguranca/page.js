'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Segurança',
    description: 'Venha fazer suas resenhas!',
}

export default function Security() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div>
            
        </div>
    )

}