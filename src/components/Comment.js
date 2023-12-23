import React from 'react';
import Vector from './Vector';

const Comment = ({ userName, userUrl, rate, month, day, comment, imageUrl }) => {
    const h3Classes = 'text-[12px]';

    const baseFlexClasses = 'flex flex-row items-center gap-1';
    const months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
    ];

    const stars = Array(rate).fill('star01');

    return (
        <div className='h-fit w-full rounded-2xl flex flex-row'>
            <img src={imageUrl} alt="" width={110} height={30} className="mr-2 rounded-full object-cover h-10 w-10" />
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full justify-between'>
                    <a href={userUrl}>
                        <a className='text-base font-bold'> {userName} </a>
                    </a>
                    <p className='text-purpleT5'>
                        {day + ' de ' + months[month - 1]}
                    </p>
                </div>
                <div className={baseFlexClasses}>
                    <div className='flex flex-row gap-1'>
                        {
                            stars.map((star, index) => (
                                <Vector key={index} vectorname={star} />
                            ))
                        }
                    </div>
                </div>
                <div className='mt-2'>
                    <p>
                        {comment}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment;
