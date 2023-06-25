import React from 'react';
import Notification from './Notification';

const Notifications = ({ isOpen, toggleNotifications }) => {
    
    return (
        <div className={`fixed top-0 right-0 w-full h-full bg-purpleT1 z-10 transition-transform duration-300 ease-in-out overflow-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-row-reverse justify-between items-center w-full mt-0 px-6 pt-20">
                <h1 className='text-2xl px-4 text-purpleT5 font-light'>Notificações</h1>
                <button onClick={toggleNotifications} className="p-4">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6M6 6L1 11M6 6L11 11M6 6L11 1" stroke="#F1F1F1" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
            <section className="flex flex-col flex-start items-center w-full max-w-md p-4 gap-4">
            </section>
            <div className="flex flex-col items-center justify-center px-4">
                <section className="flex w-full max-w-md p-4">
                    <div className='h3 w-full flex'>
                        <div className='w-full flex flex-col'>
                            <div className='h-fit w-full gap-4 mt-4 flex flex-col'>
                                <p>Abaixo você pode conferir todas as suas notificações!</p>
                                <div class="bg-scroll flex flex-col gap-4 h-[55vh] w-full overflow-y-auto">
                                    <Notification title={'Confirmado!'} content={'Ananda acabou de confirmar a presença! Pagamento via PIX.'} />
                                    <Notification title={'Chegou!'} content={'Um dos seus convidados, João, acabou de chegar! Entrada liberada por Juliano.'} />
                                    <button className='w-full h-fit px-4 py-5 bg-purpleT2 text-whiteT1 rounded-xl'>Limpar notificações</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Notifications;