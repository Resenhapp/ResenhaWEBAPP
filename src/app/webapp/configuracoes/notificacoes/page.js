'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Notificações',
    description: 'Venha fazer suas resenhas!',
}

export default function Notifications() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div>
            
        </div>
    )

}