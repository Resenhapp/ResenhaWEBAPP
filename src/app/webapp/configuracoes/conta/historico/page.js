'use client'
import React from 'react';
import PageHeader from '@/src/components/PageHeader';

export const metadata = {
    title: 'Resenha.app • Histórico de atividades',
    description: 'Venha fazer suas resenhas!',
}

export default function Privacy() {

    const handleNavigation = (pageToGo) => {
        window.location.href = `/webapp/${pageToGo}`;
    };

    return (
        <div>

        </div>
    )

}