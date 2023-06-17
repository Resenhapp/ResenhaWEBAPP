'use client'
import Button from '@/src/components/Button';
import MenuButton from '@/src/components/MenuButton';
import Notifications from '@/src/components/Notifications';
import NotificationsButton from '@/src/components/NotificationsButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';

export const metadata = {
    title: 'Resenha.app • Recepcionistas',
    description: 'Venha fazer suas resenhas!',
}
export default function Concierges() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Recepcionistas</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 flex flex-col'>
                                <div className='w-full h-fit p-4 flex flex-row bg-purpleT3 rounded-2xl ring-inset ring-2 ring-purpleT4'>
                                    <img src='https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png' className='h-full w-24 rounded-xl object-cover'/>
                                    <div>
                                        <h1>CLÁUDIO</h1>
                                        <div className='flex flex-row justify-center items-center content-center'>
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83325 0.916748C7.83325 0.640606 7.60939 0.416748 7.33325 0.416748C7.05711 0.416748 6.83325 0.640606 6.83325 0.916748V1.33325H4.16675V0.916748C4.16675 0.640606 3.94289 0.416748 3.66675 0.416748C3.39061 0.416748 3.16675 0.640606 3.16675 0.916748V1.33325H2.29167C1.50926 1.33325 0.875 1.96752 0.875 2.74992V9.16659C0.875 9.94899 1.50926 10.5833 2.29167 10.5833H8.70833C9.49074 10.5833 10.125 9.94899 10.125 9.16659V2.74992C10.125 1.96752 9.49074 1.33325 8.70833 1.33325H7.83325V0.916748ZM9.125 4.08325V2.74992C9.125 2.5198 8.93845 2.33325 8.70833 2.33325H7.83325V2.75008C7.83325 3.02622 7.60939 3.25008 7.33325 3.25008C7.05711 3.25008 6.83325 3.02622 6.83325 2.75008V2.33325H4.16675V2.75008C4.16675 3.02622 3.94289 3.25008 3.66675 3.25008C3.39061 3.25008 3.16675 3.02622 3.16675 2.75008V2.33325H2.29167C2.06155 2.33325 1.875 2.5198 1.875 2.74992V4.08325H9.125ZM1.875 5.08325H9.125V9.16659C9.125 9.3967 8.93845 9.58325 8.70833 9.58325H2.29167C2.06155 9.58325 1.875 9.3967 1.875 9.16659V5.08325Z" fill="white" />
                                            </svg>
                                            <h3>
                                                19/05/2023
                                            </h3>
                                        </div>
                                        <div className='flex flex-row justify-center items-center content-center'>
                                            <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.5C3.89543 1.5 3 2.39543 3 3.5C3 4.60457 3.89543 5.5 5 5.5C6.10457 5.5 7 4.60457 7 3.5C7 2.39543 6.10457 1.5 5 1.5ZM2 3.5C2 1.84315 3.34315 0.5 5 0.5C6.65685 0.5 8 1.84315 8 3.5C8 5.15685 6.65685 6.5 5 6.5C3.34315 6.5 2 5.15685 2 3.5Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.776864 8.45861C1.28345 7.85821 1.99058 7.5 2.75 7.5H7.25C8.00942 7.5 8.71655 7.85821 9.22314 8.45861C9.72757 9.05647 10 9.85168 10 10.6667V12C10 12.2761 9.77614 12.5 9.5 12.5C9.22386 12.5 9 12.2761 9 12V10.6667C9 10.0672 8.79832 9.50583 8.45884 9.10349C8.12152 8.70369 7.68406 8.5 7.25 8.5H2.75C2.31594 8.5 1.87848 8.70369 1.54116 9.10349C1.20168 9.50583 1 10.0672 1 10.6667V12C1 12.2761 0.776142 12.5 0.5 12.5C0.223858 12.5 0 12.2761 0 12V10.6667C0 9.85168 0.272425 9.05647 0.776864 8.45861Z" fill="white" />
                                            </svg>

                                            <h3>
                                                Ativo
                                            </h3>
                                        </div>
                                        <div className='flex flex-row justify-center items-center content-center'>
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.40397 3.63065C7.86144 4.88395 5.72072 3.44826 6.03472 1.59091H5.01536C5.32979 3.45427 3.18206 4.8799 1.64266 3.6277L1.14634 4.55566C2.83591 5.24584 2.84 7.70331 1.12381 8.38595L1.72639 9.47202C3.16283 8.2921 5.32808 9.52894 5.03052 11.4091H6.01009C5.70232 9.52925 7.86146 8.27438 9.31052 9.44746L9.86847 8.42756C8.11223 7.71762 8.20043 5.22819 9.88815 4.54315L9.40397 3.63065ZM10.3198 3.04852C10.0125 2.4693 9.25406 2.32571 8.76014 2.75322C8.02819 3.38677 6.92081 2.70727 7.10289 1.75078C7.2253 1.10779 6.73998 0.5 6.09215 0.5H4.95795C4.31012 0.5 3.82463 1.10689 3.94703 1.74989C4.1293 2.70735 3.02039 3.38546 2.28768 2.75126C1.79431 2.32421 1.0369 2.4663 0.728004 3.04385L0.133908 4.15464C-0.150721 4.68681 0.107994 5.34979 0.675408 5.54228C1.54297 5.83659 1.5551 7.07247 0.693497 7.38413L0.650369 7.39973C0.0791965 7.60634 -0.171063 8.28242 0.125666 8.81723L0.851482 10.1254C1.15727 10.6766 1.8919 10.7948 2.35191 10.3669C3.03492 9.73157 4.12546 10.3375 3.96071 11.2609L3.94969 11.3226C3.84025 11.936 4.30662 12.5 4.92326 12.5H6.11428C6.7358 12.5 7.20437 11.9291 7.08962 11.3117L7.07953 11.2574C6.90748 10.3317 7.99622 9.71386 8.68858 10.3443C9.15433 10.7684 9.88941 10.6437 10.1927 10.0892L10.8624 8.86514C11.1595 8.32206 10.9016 7.63939 10.322 7.43462C9.44002 7.12299 9.45156 5.858 10.3313 5.53978C10.9067 5.33166 11.171 4.65267 10.8822 4.10833L10.3198 3.04852Z" fill="white" />
                                            </svg>
                                            <h3>
                                                asdas
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
