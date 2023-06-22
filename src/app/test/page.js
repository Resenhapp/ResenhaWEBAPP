'use client'
import React from 'react';
import DateScroll from '@/src/components/DateScroll';

export default function Test() {
    return (
        <div>
            <DateScroll currentDate={'X'} daysToShow={'x'} selectedDate={'x'} />
        </div>
    )
}